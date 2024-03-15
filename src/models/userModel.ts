import { knex } from '../connections/connections'
import { User, OmittedUserId, OmittedUserPass } from '../types'
import bcrypt from 'bcrypt'

export const user = {

  getUser: async (id: number): Promise<OmittedUserPass> => {

    const user = await knex<User>('users')
      .where({ id })
      .returning(['id', 'full_name', 'email'])
      .first()

    return user!
  },

  updateUser: async (
    id: number,
    data: OmittedUserId
  ): Promise<Object | OmittedUserPass> => {
    if (!data) return { message: 'Nenhum dado foi fornecido para atualização.' }

    const user = await knex<User>('users').where({ id }).first()

    if (!user) return { message: 'Usuário não encontrado.' }

    user.full_name = data.full_name
    user.email = data.email
    const newPass = await bcrypt.hash(data.pass, 10)
    user.pass = newPass

    return await knex<User>('users')
    .where({ id })
    .update(user)
    .returning(['id', 'full_name', 'email'])
  },

  createUser: async (
    data: OmittedUserId
  ): Promise<OmittedUserPass | Object> => {
    const newPass = await bcrypt.hash(data.pass, 10)
    data.pass = newPass

    const createdUser = await knex<OmittedUserId>('users')
      .insert(data)
      .returning(['id', 'full_name', 'email'])
      .first()

    if (!createdUser) return { message: 'Conta excluído com sucesso.' }

    return createdUser as OmittedUserPass
  },

  deleteUser: async (id: number): Promise<Object> => {
    await knex<User>('users').where({ id }).del()

    return { message: 'Conta excluído com sucesso.' }
  },
}
