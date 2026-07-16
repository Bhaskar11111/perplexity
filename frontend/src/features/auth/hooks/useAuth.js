import {register,login,getUser} from '../service/auth.api.js'
import { setUser,setLoading, setError } from '../auth.slice.js'
import { useDispatch } from 'react-redux'


const useAuth=(()=>
    {
    const dispatch=useDispatch()

    const handleRegister=(async(username,email,password)=>
{
    try{
        dispatch(setLoading(true))
        const data=await register(username,email,password)
        dispatch(setUser(data.user))
        return data
    }
    catch(err){
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
        dispatch(setError(err.response?.data?.message || "Login failed"))
        throw err
        // dispatch(setUser(null))
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
        dispatch(setError(err.response?.data.message) || "Something went wrong")
    }
    finally{
        dispatch(setLoading(false))
    }
})

    return{
        handleRegister,
        handleLogin,
        handleGetUser
    }

})

export default useAuth;
