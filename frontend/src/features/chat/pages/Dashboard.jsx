import React from 'react'
import { useChat } from '../hooks/useChat'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'

const Dashboard = () => {
  
  const chat=useChat()
    
  useEffect(()=>
  {
    chat.initializeSocketConnection()
  },[])


  return (
    <>
    <div className="flex min-h-screen w-full">
      <Sidebar/>
      <ChatWindow/>
      
      </div>
    </>
  )
}

export default Dashboard
