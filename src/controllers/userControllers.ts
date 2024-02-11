import { Request, Response } from 'express'
import { user } from '../models/userModel'
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

export const newUser = async (req: Request, res: Response): Promise<unknown> => {
  let { nome, email, senha, idade, livros_lidos } = req.body

  try {

    const novoUsuario = await user.createUser({ nome, email, senha, idade, livros_lidos })

    return novoUsuario

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const updateUser = async (req: CustomRequest, res: Response) => {
  const { nome, email, senha, idade, livros_lidos } = req.body

  const usuario = req.usuario

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
  }

  const { id } = usuario

  try {
    const updatedUser = await user.updateUser(id, { nome, email, senha, idade, livros_lidos })

    return res.status(200).json(updatedUser)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  return 1
}