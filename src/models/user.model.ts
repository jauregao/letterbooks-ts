import { knex } from '../connections/connections'
import { User } from '../types'
import bcrypt from 'bcrypt'

export const user = {
  getUser: async (id: number) => {

    const user = await knex<User>('usuarios')
      .where({ id })
      .first()

    return user ?? null
  },

  updateUser: () => 1,

  createUser: async ({ nome, email, senha, idade, livros_lidos }: Omit<User, 'id'>): Promise<void> => {

    const senhaNova = await bcrypt.hash(senha, 10)

    await knex<Omit<User, 'id'>>('usuarios')
      .insert({ nome, email, senha: senhaNova, idade, livros_lidos })
  },

  deleteUser: () => 1
}