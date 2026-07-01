require('dotenv').config()
const cors=require('cors')
const express=require('express')
const app=express()
const authRouter=require('./routes/auth.route')
const chatRouter=require('./routes/chat.route')
const cookieParser=require('cookie-parser')
const morgan=require('morgan')

const corsOptions={
    origin:'http://localhost:5173',
    methods:['GET','POST', 'PUT', 'DELETE'],
    optionSuccessStatus:200,
    credentials:true
}

app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/chats',chatRouter)

module.exports=app