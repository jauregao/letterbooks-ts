import { Request, Response } from 'express'
import { user } from '../models/user.model'
import { User } from '../types'

interface CustomRequest extends Request {
  usuario?: User
}

export const getUserLogged = async (req: CustomRequest, res: Response) => {

  const usuario = req.usuario

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
  }

  const { id } = usuario

  try {

    const usuario = await user.getUser(Number(id))

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado.' })
    }

    return res.json({
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      idade: usuario.idade,
      livros_lidos: usuario.livros_lidos
    })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const newUser = (req: Request, res: Response) => {
  let { nome, email, senha, idade, livros_lidos } = req.body

  try {

    const novoUsuario = user.createUser({ nome, email, senha, idade, livros_lidos })

    return novoUsuario

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  return 1
}

export const deleteUser = async (req: Request, res: Response) => {
  return 1
}