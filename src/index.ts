import express from 'express'

import 'dotenv/config'

import userRoutes from './routes/user.routes'

const app = express()
app.use(express.json())

app.use(userRoutes)

app.listen(process.env.PORT)
