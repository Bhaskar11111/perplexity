import axios from 'axios'
import { API_BASE_URL } from '../../../config/api'

const api=axios.create({
    baseURL:API_BASE_URL,
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

export const logout=(async()=>
{
    const response=await api.post('/api/auth/logout')
    return response.data
})
