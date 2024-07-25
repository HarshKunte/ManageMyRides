import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'
import userRoutes from './routes/user.routes.js'
import invoiceRoutes from './routes/invoice.routes.js'
import fuelRoutes from './routes/fuel.routes.js'
import otherExpenseRoutes from './routes/expense.router.js'
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*"
}))
app.options('*',cors());
app.options('/*', (_, res) => {
  res.sendStatus(200);
});
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.method === 'OPTIONS') {
      return res.status(200).json(({
          body: "OK"
      }))
  }
    next()
  });

app.use('/api/',authRoutes)
app.use('/api/',transactionRoutes)
app.use('/api/',userRoutes)
app.use('/api/',invoiceRoutes)
app.use('/api/',fuelRoutes)
app.use('/api/',otherExpenseRoutes)

export default app