import { Router } from 'express'
import { verifyUserIsLogged } from '../middlewares/userAuth'

const bookRoutes = Router()

bookRoutes.use(verifyUserIsLogged)

bookRoutes.get('/livros')

bookRoutes.get('/livros/:id')

bookRoutes.post('/livros')

bookRoutes.patch('/livros/:id')

bookRoutes.delete('/livros/:id')

export default bookRoutes
