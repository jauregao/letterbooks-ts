import { knex } from '../connections/connections'
import { User } from '../types'
import bcrypt from 'bcrypt'

type UserOmitPass = Omit<User, 'senha'>

export const user = {
  getUser: async (id: number) => {

    const user = await knex<User>('usuarios')
      .where({ id })
      .returning('*')
      .first()

    return user
  },

  updateUser: async (id: number, { nome, email, senha, idade, livros_lidos }: Omit<User, 'id'>): Promise<Object | UserOmitPass> => {
    if (!nome && !email && !senha && !idade && !livros_lidos) {
      return { message: 'Nenhum dado foi fornecido para atualização.' }
    }

    const user = await knex<User>('usuarios')
      .where({ id })
      .first();

    if (!user) {
      return { message: 'Usuário não encontrado.' }
    }

    if (nome) {
      user.nome = nome
    }
    if (email) {
      user.email = email
    }
    if (senha) {
      const senhaNova = await bcrypt.hash(senha, 10)
      user.senha = senhaNova
    }
    if (idade) {
      user.idade = idade
    }
    if (livros_lidos) {
      user.livros_lidos = livros_lidos
    }

    await knex<User>('usuarios')
      .where({ id })
      .update(user)
      .returning('*')

    const { senha: _, ...userData } = user

    return userData

  },

  createUser: async ({ nome, email, senha, idade, livros_lidos }: Omit<User, 'id'>): Promise<void> => {

    const senhaNova = await bcrypt.hash(senha, 10)

    await knex<Omit<User, 'id'>>('usuarios')
      .insert({ nome, email, senha: senhaNova, idade, livros_lidos })
      .returning('*')
  },

  deleteUser: () => 1
}