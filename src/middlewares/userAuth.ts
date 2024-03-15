import { knex } from '../connections/connections'
import jwt, { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

interface CustomRequest extends Request {
  usuario?: Record<string, Object>
}

const secretKey: Secret = process.env.JWT_SECRET_KEY!

export const verifyUserIsLogged = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Object> => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  try {
    const token: string = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, secretKey) as { id: string }

    const { pass, ...loginUser} = await knex('users').where({ id }).first()

    if (!loginUser) return res.status(404).json({ message: 'Usuario não encontrado' })

    req.usuario = loginUser

    next()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}
