import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export const register=(async(username,email,password)=>
{
    const response=await api.post('/api/auth/register',{
        username,
        email,
        password
    })
    return response.data
})

export const login=(async(identifier,password)=>
{
    const response=await api.post('/api/auth/login',{
        identifier,
        password
    })
    return response.data
})

export const getUser=(async()=>
{
    const response=await api.get('/api/auth/getUser')
    return response.data
})