import { knex } from '../connections/connections'
import { User, OmittedUserId, OmittedUserPass } from '../types'
import bcrypt from 'bcrypt'

export const user = {
  getUser: async (id: number) => {
    return await knex<User>('usuarios').where({ id }).returning('*').first()
  },

  updateUser: async (
    id: number,
    data: OmittedUserId
  ): Promise<Object | OmittedUserPass> => {
    if (!data) {
      return { message: 'Nenhum dado foi fornecido para atualização.' }
    }

    const user = await knex<User>('usuarios').where({ id }).first()

    if (!user) {
      return { message: 'Usuário não encontrado.' }
    }

    if (user.nome) {
      user.nome = data.nome
    }
    if (user.email) {
      user.email = data.email
    }
    if (user.senha) {
      const senhaNova = await bcrypt.hash(data.senha, 10)
      user.senha = senhaNova
    }

    await knex<User>('usuarios').where({ id }).update(user).returning('*')

    const { senha: _, ...userData } = user

    return userData
  },

  createUser: async (data: OmittedUserId): Promise<Object> => {
    const senhaNova = await bcrypt.hash(data.senha, 10)

    data.senha = senhaNova

    return await knex<OmittedUserId>('usuarios').insert(data).returning('*')
  },

  deleteUser: async (id: number): Promise<Object> => {
    await knex<User>('usuarios').where({ id }).del()
    
    return { message: 'Conta excluído com sucesso.' }
  },
}
