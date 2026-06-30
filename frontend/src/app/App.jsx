import React, { useEffect } from 'react'
import authRouter from '../app/app.routes'
import { RouterProvider } from 'react-router'
import useAuth from '../features/auth/hooks/useAuth'

const App = () => {
  
  const auth=useAuth()

  useEffect(()=>
  {
    auth.handleGetUser()
  },[])

  return (
   <>
   <RouterProvider router={authRouter}/>
   </>
  )
}

export default App
