import { OmittedBookId } from './../types'
import { knex } from '../connections/connections'
import { Book } from '../types'

export const books = {
  getAll: async (id: number): Promise<Book[]> => {

    const subquery = knex('read_books')
    .where({id})
    .select('book_isbn');

    return (await knex<Book>('livros').whereIn('isbn', subquery)) as Book[]
  },

  getOne: async (bookName: string): Promise<Book> => {
    return (await knex<Book>('livros')
      .where({ title: bookName })
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

    if (bookData.title) {
      book.title = bookData.title
    }
    if (bookData.review) {
      book.review = bookData.review
    }
    if (bookData.rating) {
      book.rating = bookData.rating
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
