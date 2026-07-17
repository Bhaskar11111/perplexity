const {Server}=require('socket.io')
const { allowedOrigins } = require('../config/urls')

let io;

const initSocket=((httpServer)=>
{
    io=new Server(httpServer,{
        cors:{
            origin:allowedOrigins,
            credentials:true,
            methods:['GET','POST','PUT','DELETE','PATCH'],
            optionSuccessStatus:true
        }
    })

    console.log('Socket.io is running')

    io.on('connection',(socket)=>
    {
        console.log('A user has been connected ' + socket.id)
    })

})
    const getIO=(()=>
    {
        if(!io)
        {
            throw new Error('Socket.io not initialized')
        }

        return io;
    })


module.exports={
    initSocket,
    getIO
}
