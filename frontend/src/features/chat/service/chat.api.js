import axios from 'axios'
import { API_BASE_URL } from '../../../config/api'

const api=axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

export const sendMessage=(async(message,chatId,image)=>
{
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
})

export const getChats=(async()=>
{
    const response=await api.get('/api/chats')
    
    return response.data
})

export const getMessages=(async(chatId)=>
{
    const response=await api.get(`/api/chats/messages/${chatId}`)

    return response.data
})

export const deleteChat=(async(chatId)=>
{
    const response=await api.delete(`/api/chats/${chatId}`)

    return response.data
})
