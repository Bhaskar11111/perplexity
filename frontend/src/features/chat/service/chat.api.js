import axios from 'axios'

const api=axios.create({
    baseURL:'https://etos-backend-wmmj.onrender.com/',
    withCredentials:true
})

export const sendMessage=(async(message,chatId,image)=>
{
    try{
        const payload=image ? new FormData() : {
            message,
            chatId
        }

        if(image)
        {
            payload.append('message',message)
            if(chatId)
            {
                payload.append('chatId',chatId)
            }
            payload.append('image',image)
        }

        const response=await api.post('/api/chats/message',payload)
    return response.data
    }
    catch(err){
        throw err
    }
})

export const getChats=(async()=>
{
    try{
        const response=await api.get('/api/chats')
        
        return response.data
    }
    catch(err){
        throw err
    }
})

export const getMessages=(async(chatId)=>
{
    try{
        const response=await api.get(`/api/chats/messages/${chatId}`)

        return response.data
    }
    catch(err){
        throw err
    }
})

export const deleteChat=(async(chatId)=>
{
    try{
        const response=await api.delete(`/api/chats/${chatId}`)

        return response.data
    }
    catch(err){
        throw err
    }
})
