const app=require('./src/app')
const connectDB = require('./src/config/database')
const http=require('http')
const { initSocket } = require('./src/sockets/server.socket')
const PORT = process.env.PORT || 3000

connectDB()

const httpSever=http.createServer(app)

initSocket(httpSever)

httpSever.listen(PORT,()=>
{
    console.log(`Server running on port ${PORT}`)
})
