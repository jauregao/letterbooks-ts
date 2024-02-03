import { Router } from 'express'
import { getUserLogged, newUser, login, updateUser, deleteUser } from '../controllers/user.controllers';

const routes = Router()

routes.get('/usuario',
  getUserLogged)
routes.post('/usuario',
  newUser)
routes.post('/login',
  login)
routes.put('/usuario',
  updateUser)
routes.delete('/usuario',
  deleteUser)


export default routes
