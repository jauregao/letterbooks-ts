export type User = {
  id: number
  nome: string
  email: string
  senha: string
}

export type Book = {
  id: number
  nome: string
  nota: 1 | 2 | 3 | 4 | 5
  descricao?: string
  usuario: number
}

export type OmittedUserId = Omit<User, 'id'>

export type OmittedUserPass = Omit<User, 'senha'>

export type OmittedBookId = Omit<Book, 'id'>
