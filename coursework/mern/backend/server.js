import express from 'express'
import process from 'process'
import colors from 'colors'
import dns from 'dns'
import goalRouter from './routes/goalRoutes.js'
import userRouter from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'


const app = express()
const port = process.env.PORT

dns.setServers(['8.8.8.8', '8.8.4.4']);
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(port, () => { console.log(`Server started at port ${port}`) })