import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'
import userRoutes from './routes/user.routes.js'
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use('/api/',authRoutes)
app.use('/api/',transactionRoutes)
app.use('/api/',userRoutes)

export default app