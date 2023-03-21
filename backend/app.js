import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use('/api/',authRoutes)
app.use('/api/',transactionRoutes)

export default app