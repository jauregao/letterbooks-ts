export type User = {
  id: number,
  nome: string,
  email: string,
  senha: string,
  idade?: number,
  livros_lidos: number
}

export type Book = {
  id: number,
  nome: string,
  nota: 1 | 2 | 3 | 4 | 5,
  descricao?: string,
  usuario: number
}