import { Request, Response } from 'express'
import { user } from '../models/userModel'
import { User, OmittedUserId, OmittedUserPass } from '../types'

interface CustomRequest extends Request {
  usuario?: User
}

export const getUserLogged = async (req: CustomRequest, res: Response): Promise<OmittedUserPass | Object> => {
  const usuario = req.usuario!
  const { id } = usuario

  try {
    const loggedUser = await user.getUser(id)

    return res.json({
      id: loggedUser.id,
      nome: loggedUser.full_name,
      email: loggedUser.email
    })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const newUser = async ( req: Request, res: Response): Promise<User | Object> => {
  const newUserPayload: OmittedUserId = req.body

  try {
    return res.status(201).json(await user.createUser(newUserPayload))

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const updateUser = async (req: CustomRequest, res: Response) => {
  const updateUserPayload = req.body
  const usuario = req.usuario!
  const { id } = usuario

  try {
    return res.status(200).json(await user.updateUser(id, updateUserPayload))

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const deleteUser = async ( req: CustomRequest, res: Response ): Promise<Object> => {
  const usuario = req.usuario!
  const { id } = usuario

  try {
    await user.deleteUser(id)

    return { message: `Usuário excluído com sucesso` }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}
