import {io} from 'socket.io-client'

export const initializeSocketConnection=(()=>
{
    const socket=io('https://etos-backend-wmmj.onrender.com',{
        withCredentials:true
    })

    socket.on("connect",(socket)=>
    {
        console.log('Connected to Socket.io server')
    })
})