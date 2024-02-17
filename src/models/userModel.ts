import { knex } from '../connections/connections'
import { User, OmittedUserId, OmittedUserPass } from '../types'
import bcrypt from 'bcrypt'

export const user = {
  getUser: async (id: number) => {

    const user = await knex<User>('usuarios')
      .where({ id })
      .returning('*')
      .first()

    return user
  },

  updateUser: async (id: number, data: OmittedUserId): Promise<Object | OmittedUserPass> => {
    if (!data) {
      return { message: 'Nenhum dado foi fornecido para atualização.' }
    }

    const user = await knex<User>('usuarios')
      .where({ id })
      .first();

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
    if (user.idade) {
      user.idade = data.idade
    }
    if (user.livros_lidos) {
      user.livros_lidos = data.livros_lidos
    }

    await knex<User>('usuarios')
      .where({ id })
      .update(user)
      .returning('*')

    const { senha: _, ...userData } = user

    return userData

  },

  createUser: async (data: OmittedUserId): Promise<void> => {

    const senhaNova = await bcrypt.hash(data.senha, 10)

    data.senha = senhaNova

    await knex<OmittedUserId>('usuarios')
      .insert(data)
      .returning('*')
  },

  deleteUser: async (id: number): Promise<void> => {

    await knex<User>('usuarios')
      .where({ id })
      .del()
  }
}