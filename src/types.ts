export type User = {
  id: number
  full_name: string
  email: string
  pass: string
}

export type Book = {
  id: number
  title: string
  rating: 1 | 2 | 3 | 4 | 5
  review?: string
}

export type ReadBook = {
  id: number
  user_id: number
  book_isbn: number
}

export type OmittedUserId = Omit<User, 'id'>

export type OmittedUserPass = Omit<User, 'pass'>

export type OmittedBookId = Omit<Book, 'id'>
