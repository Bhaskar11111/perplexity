import { setChats,setCurrentChatId,setLoading,setError } from "../chat.slice"
import { sendMessage,getChats,getMessages } from "../service/chat.api"
import { initializeSocketConnection } from "../service/socket.service"
import { useDispatch } from 'react-redux'

export const useChat=(()=>
{
    const dispatch=useDispatch()

    const handleSendMessage=(async()=>
    {
        dispatch(setLoading(true))
    })

    return{
        initializeSocketConnection
    }
})