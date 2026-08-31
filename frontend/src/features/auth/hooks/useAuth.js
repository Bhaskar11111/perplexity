import {register,login,getUser,logout} from '../service/auth.api.js'
import { setUser,setLoading, setError } from '../auth.slice.js'
import { useDispatch } from 'react-redux'
import { clearChats } from '../../chat/chat.slice.js'


const useAuth=(()=>
    {
    const dispatch=useDispatch()

    const handleRegister=(async(username,email,password)=>
{
    try{
        dispatch(setLoading(true))
        const data=await register(username,email,password)
        dispatch(setUser(null))
        dispatch(clearChats())
        return data
    }
    catch(err){
        dispatch(setUser(null))
        dispatch(clearChats())
        dispatch(setError(err.response?.data?.message || "Registration failed"))
        throw err
    }
    finally{
        dispatch(setLoading(false))
    }
})

const handleLogin=(async(identifier,password)=>
{
    try{
        dispatch(setLoading(true))
        const data=await login(identifier,password)
        dispatch(setUser(data.user))
        return data
    }
    catch(err){
        dispatch(setUser(null))
        dispatch(clearChats())
        dispatch(setError(err.response?.data?.message || "Login failed"))
        throw err
    }
    finally{
        dispatch(setLoading(false))
    }
})

const handleGetUser=(async()=>
{
    try{
        dispatch(setLoading(true))
        const data=await getUser()
        dispatch(setUser(data.user))
    }
    catch(err){
        dispatch(setUser(null))
        dispatch(clearChats())
        dispatch(setError(err.response?.data?.message || "Something went wrong"))
    }
    finally{
        dispatch(setLoading(false))
    }
})

const handleLogout=(async()=>
{
    try{
        dispatch(setLoading(true))
        const data=await logout()
        dispatch(setUser(null))
        dispatch(clearChats())
        return data
    }
    catch(err){
        dispatch(setUser(null))
        dispatch(clearChats())
        dispatch(setError(err.response?.data?.message || "Logout failed"))
        throw err
    }
    finally{
        dispatch(setLoading(false))
    }
})

    return{
        handleRegister,
        handleLogin,
        handleGetUser,
        handleLogout
    }

})

export default useAuth;
