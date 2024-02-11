import { knex } from '../connections/connections';
import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const secretKey: Secret = process.env.JWT_SECRET_KEY ?? 'abcdef'
const expires = process.env.JWT_EXPIRED

const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where({ email }).returning("*").first();

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário e/ou senha inválido(s)' })
    };

    const senhaValida = await comparePasswords(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(400).json({ message: 'Usuário e/ou senha inválido(s)' })
    };

    const token = generateAuthToken(usuario.id)

    return res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token: token
    });

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

function generateAuthToken(userId: string): string {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: expires });
}

export default login
