import { Router } from 'express'
import {
  getUserLogged,
  newUser,
  updateUser,
  deleteUser
} from '../controllers/userControllers';
import login from '../controllers/userLogin'
import { verifyUserIsLogged } from '../middlewares/userAuth';


const userRoutes = Router()

userRoutes.post('/usuario',
newUser)

userRoutes.post('/login',
  login)

userRoutes.get('/usuario',
  verifyUserIsLogged,
  getUserLogged)

userRoutes.put('/usuario',
  verifyUserIsLogged,
  updateUser)

userRoutes.delete('/usuario',
  verifyUserIsLogged,
  deleteUser)



export default userRoutes
