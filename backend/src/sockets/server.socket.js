const {Server}=require('socket.io')

let io;

const initSocket=((httpServer)=>
{
    io=new Server(httpServer,{
        cors:{
            origin:'http://localhost:5173',
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