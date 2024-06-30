import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import errorController from './controllers/errorController.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const corsOption = {
  origin: "http://localhost:5173"
}

if(process.env.NODE_ENV !== 'PRODUCTION'){
  dotenv.config({ path: "./backend/config.env" })
}

const app = express()

app.use(cors(corsOption))

let DB;

if(process.env.NODE_ENV === 'DEVELOPMENT') DB = process.env.DB_DEV
if(process.env.NODE_ENV === 'PRODUCTION') DB = process.env.DB_PROD

mongoose.connect(DB)
  .then((con) => {
    console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`)
  })

app.use(express.json())

import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
// import { fileURLToPath } from 'url'

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", userRoutes);

if(process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
  })
}

app.use(errorController)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

process.on('unhandledRejection', (err) => {
  console.log('shutting down server due to unhandled promise rejection')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})