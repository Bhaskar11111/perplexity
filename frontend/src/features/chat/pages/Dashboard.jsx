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

  const dummy=
    [
  {
    role: "user",
    content: "Hi! Can you help me plan my day?"
  },
  {
    role: "assistant",
    content: "Of course! What do you have scheduled today? Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore adipisci a nesciunt facilis hic aliquid. Obcaecati iusto necessitatibus, nisi fugit, cum sapiente ab, repudiandae facere perferendis dolor omnis dolorem quis iure vel. Nemo illo doloribus esse praesentium amet cum maiores ea ipsa! Deleniti eos omnis dolores vel explicabo eligendi doloremque, odit in incidunt, labore tempore voluptatum nihil maiores, ipsam aspernatur nam quidem asperiores possimus quibusdam consequatur consectetur modi. Neque, incidunt?"
  },
  {
    role: "user",
    content: "I have classes in the morning and coding practice in the evening."
  },
  {
    role: "assistant",
    content: "That sounds like a productive day. I'd suggest finishing any assignments after your classes and taking a short break before coding practice."
  },
  {
    role: "user",
    content: "Thanks! I'll do that."
  }
  ]

  return (
    <>
    <div className="flex min-h-screen w-full">
      <Sidebar/>
        <ChatWindow />
      
            
      </div>
    </>
  )
}

export default Dashboard
