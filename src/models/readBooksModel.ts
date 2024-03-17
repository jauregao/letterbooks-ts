import { knex } from '../connections/connections'
import { ReadBook } from '../types'

export const readBook = {
  insertBook: async (userId: number, bookId: number ): Promise<void> => {
    await knex<ReadBook>('read_books').insert({user_id: userId, book_isbn: bookId})
  }
}
