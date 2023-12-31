import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB  from './config/conn.js'
import authRoutes from './routes/authRoute.js'

dotenv.config()
connectDB()
const app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/v1/auth',authRoutes)
app.get('/',(req,res)=>{
    res.send({
        message:"welcome"
    })
})
const Port=process.env.Port||8542;
app.listen(Port,()=>{
    console.log(`connection successfull on port number ${Port}`)
})