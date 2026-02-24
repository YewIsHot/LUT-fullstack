import express from 'express'
import process from 'process'
import dns from 'dns'
import path from 'path'
import { fileURLToPath } from 'url';
import postRouter from './routes/postRoutes.js'
import userRouter from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT

dns.setServers(['8.8.8.8', '8.8.4.4']);
await connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.text());
app.use(express.raw());

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get(/(.*)/, (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
    )
  );
}
// else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler)

app.listen(port, () => { console.log(`Server started at port ${port}`) })