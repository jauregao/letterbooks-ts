import { OmittedBookId } from './../types';
import { Request, Response } from 'express'
import { User, Book } from '../types'
import { books } from '../models/booksModel'
import { readBook } from '../models/readBooksModel'
interface CustomRequest extends Request {
  usuario?: User
}

export const insertBook = async (req: CustomRequest, res: Response): Promise<Book | Object> => {
  const usuario = req.usuario!
  const { id } = usuario

  const bookData: Book = req.body

  try {
    const book = await books.createBook(bookData)
    //insere o registro também na tabela de livros lidos
    await readBook.insertBook(id, bookData.id)

    return book

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const updateBook = async (req: CustomRequest, res: Response) => {
  const usuario = req.usuario!
  const { id } = usuario
  
  const bookData: OmittedBookId = req.body

  try {

    
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const getBooks = async (req: CustomRequest, res: Response) => {
  const usuario = req.usuario!
  const { id } = usuario

  try {
    return await books.getAll(id)
    
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const deleteBook = async (req: CustomRequest, res: Response) => {
  const usuario = req.usuario!
  const { id } = usuario
  
  const bookData: Book = req.body


  try {
    
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}