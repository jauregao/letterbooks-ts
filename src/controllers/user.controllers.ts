import { Request, Response } from 'express'
import { user } from '../models/user.model'

// export const getUserLogged = async (req: Request, res: Response) => {

//   const { id } = req;
//   try {
//     user.getUser(Number(id))

//     if (!user) {
//       return res.status(404).json({ mensagem: 'Usuario não encontrado.' })
//     }

//     return res.json(user)

//   } catch (error) {
//     return res.status(500).json({ mensagem: 'Erro interno do servidor' })
//   }
// }

export const newUser = async (req: Request, res: Response): Promise<Object> => {
  let { nome, email, senha, idade, livros_lidos } = req.body

  try {

    await user.createUser({ nome, email, senha, idade, livros_lidos })

    const novoUsuario = {
      usuario: {
        nome,
        email,
        idade,
        livros_lidos
      }
    }
    return novoUsuario

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const login = async (req: Request, res: Response) => {
  return 1
}

export const updateUser = async (req: Request, res: Response) => {
  return 1
}

export const deleteUser = async (req: Request, res: Response) => {
  return 1
}