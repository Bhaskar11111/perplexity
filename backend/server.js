const app=require('./src/app')
const connectDB = require('./src/config/database')
const http=require('http')
const { initSocket } = require('./src/sockets/server.socket')

connectDB()

const httpSever=http.createServer(app)

initSocket(httpSever)

httpSever.listen(3000,()=>
{
    console.log('Server running on port 3000')
})