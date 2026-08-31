import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import ShinyText from './Bits/ShinyText'

const Protected = ({children}) => {

    const user=useSelector((state)=>state.auth.user)
    const loading=useSelector((state)=>state.auth.loading)

    if(loading){
        return <div className="w-full h-screen flex items-center justify-center text-2xl  bg-black/40 font-thin ">
            <ShinyText
  text="Loading..."
  speed={1}
  delay={0.1}
  color="#6c6c6ca7"
  shineColor="#7C3AED"
  spread={90}
  direction="left"
  yoyo={false}
  pauseOnHover={false}
  disabled={false}
/>
        </div>
    }
   
    if(!user){
        return <Navigate to='/login' replace />
    }

    return children;
}

export default Protected