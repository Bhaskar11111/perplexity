import React, { useEffect } from 'react'
import authRouter from '../app/app.routes'
import { RouterProvider } from 'react-router'
import useAuth from '../features/auth/hooks/useAuth'
import { ToastProvider } from './Toast'

const App = () => {
  
  const auth=useAuth()

  useEffect(()=>
  {
    auth.handleGetUser()
  },[])

  return (
   <ToastProvider>
   <RouterProvider router={authRouter}/>
   </ToastProvider>
  )
}

export default App
