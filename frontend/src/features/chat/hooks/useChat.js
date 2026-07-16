import { setChats,setCurrentChatId,setLoading,setError,createDraftChat,createNewChat,replaceDraftChat,addMessage,updateMessage,addFollowMessages } from "../chat.slice"
import { sendMessage,getChats,getMessages } from "../service/chat.api"
import { initializeSocketConnection } from "../service/socket.service"
import { useDispatch } from 'react-redux'

export const useChat=(()=>
{
    const dispatch=useDispatch()

    const handleSendMessage=(async(message,chatId)=>
    {
        const optimisticChatId=chatId || `draft-${Date.now()}`
        const userMessageId=`user-${Date.now()}`
        const pendingMessageId=`ai-pending-${Date.now()}`

        try{
            dispatch(setLoading(true))
            const isDraftChat=optimisticChatId.startsWith("draft-")

            if (!chatId) {
                dispatch(createDraftChat({chatId:optimisticChatId}))
            }

            dispatch(setCurrentChatId(optimisticChatId));

            dispatch(addMessage({
                chatId:optimisticChatId,
                id:userMessageId,
                role:"user",
                content:message,
                shouldAnimate:false
            }))

            dispatch(addMessage({
                chatId:optimisticChatId,
                id:pendingMessageId,
                role:"ai",
                content:"thinking...",
                shouldAnimate:false,
                isPending:true
            }))
            
            // if it's not a new chat, then the chatId will remain undefined, and backend will handle it.
            const data=await sendMessage(message,isDraftChat ? undefined : optimisticChatId) 
            const {chat,aiMessage}=data
            const activeChatId=chat._id || optimisticChatId
            
            if (isDraftChat) {
                dispatch(replaceDraftChat({
                    draftChatId:optimisticChatId,
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

            dispatch(updateMessage({
                chatId:activeChatId,
                messageId:pendingMessageId,
                role:aiMessage.role,
                content:aiMessage.content,
                shouldAnimate:true,
                isPending:false
            }))
        }
        catch(err){
            dispatch(updateMessage({
                chatId:optimisticChatId,
                messageId:pendingMessageId,
                role:"ai",
                content:err.response?.data?.message || err.message || "Something went wrong",
                shouldAnimate:false,
                isPending:false
            }))
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
                role:elem.role,
                shouldAnimate:false,
                isPending:false
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
