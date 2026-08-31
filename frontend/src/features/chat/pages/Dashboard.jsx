import React, { useState } from 'react'
import { useChat } from '../hooks/useChat'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'

const Dashboard = () => {

        document.title='Etos | Dashboard'

    
  const [isSideBarOpen, setIsSideBarOpen] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  )
  
  const chat=useChat()
    
  useEffect(()=>
  {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  },[])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")

    const handleScreenChange = (event) => {
      setIsSideBarOpen(event.matches)
    }

    mediaQuery.addEventListener("change", handleScreenChange)

    return () => mediaQuery.removeEventListener("change", handleScreenChange)
  }, [])

  

  return (
    <>
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} selectChat={chat.handleOpenChat}/>
        <ChatWindow isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen}/>
      </div>
    </>
  )
}

export default Dashboard
