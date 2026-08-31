require('dotenv').config()
const dns=require('dns')
const { default: mongoose } = require("mongoose");

dns.setServers(['8.8.8.8','8.8.4.4']);

const connectDB=(()=>
{
    mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>
{
    console.log('Connected to database')
})
.catch((err)=>
{
    console.log(err);
})
})

module.exports=connectDB