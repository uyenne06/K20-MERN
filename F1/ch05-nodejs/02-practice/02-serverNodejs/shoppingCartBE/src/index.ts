import express from 'express'
import usersRoutes from './routes/users.routes'

import databaseServices from './services/database.services'
import { error } from 'console'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRoutes from './routes/medias.routes'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.routes'
const app = express() //dựng server lên
const PORT = 3000 //mở cổng backend với port 3000

//kết nối database
databaseServices.connect()

app.use(express.json())
initFolder()
app.use('/users', usersRoutes)
app.use('/medias', mediasRoutes)
app.use('/static', staticRouter)

//hệ thống Error Handler tổng
app.use(defaultErrorHandler)

//cho app mở cổng đón khách ở PORT
app.listen(PORT, () => {
  console.log(`Project này đang chạy trên localhost:${PORT}`)
})
