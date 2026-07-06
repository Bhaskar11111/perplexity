import { setChats,setCurrentChatId,setLoading,setError } from "../chat.slice"
import { sendMessage,getChats,getMessages } from "../service/chat.api"
import { initializeSocketConnection } from "../service/socket.service"
import { useDispatch } from 'react-redux'

export const useChat=(()=>
{
    const dispatch=useDispatch()

    const handleSendMessage=(async(message,chatId)=>
    {
        try{
            dispatch(setLoading(true))
            // if it's not a new chat, then the chatId will remain undefined, and backend will handle it.
            const data=await sendMessage(message,chatId) 
            const {chat,aiMessage}=data
            dispatch(setChats((prev)=>
            {
                return {
                    ...prev,
                    [chat._id]:{
                        ...chat,
                        messages:[{content:message,role:'user'},aiMessage]
                    }
                }
            }))
            dispatch(setCurrentChatId(chat._id || chatId))

        }
        catch(err){
            dispatch(setError(err.response?.data?.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    })

    return{
        initializeSocketConnection,
        handleSendMessage
    }
})