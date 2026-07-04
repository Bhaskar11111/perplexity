import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export const sendMessage=(async(message,chatId)=>
{
    try{
        const response=await api.post('/api/chats/message',{
        message,
        chatId
    })
    return response.data
    }
    catch(err){
        throw new Error(err)
    }
})

export const getChats=(async()=>
{
    try{
        const response=await api.get('/api/chats')
        
        return response.data
    }
    catch(err){
        throw new Error(err)
    }
})

export const getMessages=(async(chatId)=>
{
    try{
        const response=await api.get('/api/chats/message/:chatId')

        return response.data
    }
    catch(err){
        throw new Error(err)
    }
})