import { Router } from 'express'
import {
  getUserLogged,
  newUser,
  updateUser,
  deleteUser,
} from '../controllers/userControllers'
import login from '../controllers/userLogin'
import { verifyUserIsLogged } from '../middlewares/userAuth'
import { verifyEmailExists } from '../middlewares/verifyEmailExists'

const userRoutes = Router()

userRoutes.post('/usuario', verifyEmailExists ,newUser)

userRoutes.post('/login', login)

userRoutes.get('/usuario', verifyUserIsLogged, getUserLogged)

userRoutes.patch('/usuario', verifyUserIsLogged, updateUser)

userRoutes.delete('/usuario', verifyUserIsLogged, deleteUser)

export default userRoutes
