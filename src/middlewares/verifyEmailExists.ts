import { knex } from '../connections/connections'
import { NextFunction, Request, Response } from 'express'
import { User } from '../types'

export const verifyEmailExists= async ( req: Request, res: Response, next: NextFunction ): Promise<void | Object> => {

  const { email } = req.body

  try {
    const userEmail = await knex<User>('users').where({email}).first()

    if(userEmail) return res.status(400).json({message: 'Email já cadastrado.'})

    next()
  } catch (error) {
    return { messagem: 'Erro interno do servidor.' }
  }
}
