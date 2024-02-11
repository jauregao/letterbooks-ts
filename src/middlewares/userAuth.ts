import { knex } from '../connections/connections';
import jwt, { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'


interface CustomRequest extends Request {
  usuario?: Record<string, any>
}

const secretKey: Secret = process.env.JWT_SECRET_KEY ?? 'abcdef'

export const verifyUserIsLogged = async (req: CustomRequest, res: Response, next: NextFunction) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }

  try {
    const token: string = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, secretKey) as { id: string };

    const query = await knex("usuarios").where({ id }).first();

    if (!query) {
      return res.status(404).json("Usuario não encontrado");
    }

    const { senha, ...usuario } = query;

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}
