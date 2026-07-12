import { setChats,setCurrentChatId,setLoading,setError,createNewChat,replaceDraftChat,addMessage,addFollowMessages } from "../chat.slice"
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
            const isDraftChat=chatId?.startsWith("draft-")
            
            // if it's not a new chat, then the chatId will remain undefined, and backend will handle it.
            const data=await sendMessage(message,isDraftChat ? undefined : chatId) 
            const {chat,aiMessage}=data
            const activeChatId=chat._id || chatId
            
            if (isDraftChat) {
                dispatch(replaceDraftChat({
                    draftChatId:chatId,
                    chatId:activeChatId,
                    title:chat.title
                }))
            }
            else {
                dispatch(createNewChat({
                    chatId:activeChatId,
                    title:chat.title
                }))
            }

            dispatch(setCurrentChatId(activeChatId));

            dispatch(addMessage({
                chatId:activeChatId,
                role:"user",
                content:message
            }))

            dispatch(addMessage({
                chatId:activeChatId,
                role:aiMessage.role,
                content:aiMessage.content,
            }))
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || err.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    })

    const handleGetChats=(async()=>
    {
        try{
            dispatch(setLoading(true))
            const data=await getChats()
            const chats=data.chats || data.chat || []
            dispatch(setChats(chats.reduce((acc,chat)=>
            {
                acc[chat._id]={
                    id:chat._id,
                    title:chat.title,
                    messages:[],
                    lastUpdated:chat.updatedAt,
                    isDraft:false,
                }
                return acc;
            }, {})))
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || err.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    })

    const handleOpenChat=(async(chatId)=>
    {
        try {
            dispatch(setLoading(true))
            const data=await getMessages(chatId)
            const {messages}=data

            const formattedMessages=messages.map((elem)=>
            ({
                content:elem.content,
                role:elem.role
            }))
            dispatch(addFollowMessages({
                chatId,
                messages:formattedMessages
            }))

            dispatch(setCurrentChatId(chatId))
        }
        catch(err) {
            dispatch(setError(err.response?.data?.message || err.message))
        }
        finally {
            dispatch(setLoading(false))
        }
    })

    return{
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
})
