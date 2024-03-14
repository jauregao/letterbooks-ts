import { OmittedBookId } from './../types'
import { knex } from '../connections/connections'
import { Book } from '../types'

export const books = {

  getAll: async (): Promise<Book[]> => {
    return (await knex<Book>('livros')) as Book[]
  },

  getOne: async (bookName: string): Promise<Book> => {
    return (await knex<Book>('livros')
      .where({ nome: bookName })
      .returning('*')
      .first()) as Book
  },

  updateBook: async (
    id: number,
    bookData: OmittedBookId
  ): Promise<Book | Object> => {
    if (!bookData) {
      return { message: 'Nenhum dado foi fornecido para atualização.' }
    }

    const book = await knex<Book>('livros').where({ id }).returning('*').first()

    if (!book) {
      return { message: 'Livro não encontrado.' }
    }

    if (bookData.nome) {
      book.nome = bookData.nome
    }
    if (bookData.descricao) {
      book.descricao = bookData.descricao
    }
    if (bookData.nota) {
      book.nota = bookData.nota
    }

    return (await knex<Book>('livros')
      .where({ id })
      .update(book)
      .returning('*')
      .first()) as Book
  },

  createBook: async (bookData: OmittedBookId): Promise<Object | Book> => {
    if (!bookData) {
      return { message: 'Nenhum dado foi informado.' }
    }

    return (await knex<Book>('livros')
      .insert(bookData)
      .returning('*')
      .first()) as Book
  }, 
  
  deleteBook: async (id: number): Promise<Object> => {
    await knex<Book>('livros').where({ id }).del()

    return { message: 'Livro excluído com sucesso.' }
  },
}
