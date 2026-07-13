import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { createDraftChat, setChats, setCurrentChatId } from "../chat.slice";
import {useChat} from '../hooks/useChat.js'

const ChatWindow = () => {

  const welcomeMessgaes=[
      "What's on the Agenda Today?","Hello! I'm Etos. How can I help you today?",
  "What is on your mind? Let's brainstorm or solve a problem.",
  "Welcome back! Ask me anything, or type a topic to start.",
  "Ready to create? Tell Etos what you are writing, designing, or planning.",
  "Let's build something. Drop an idea, and we will flesh it out.",
  "Need inspiration? Ask Etos for a story prompt, marketing hook, or outline.",
  "New chat started. Drop code, data, or text here to analyze.",
  "How can Etos make your day easier? I can draft emails, summarize files, or fix bugs.",
  "What are we tackling next? Give me a task or a question.",
  "Hey! Etos here. What are we working on right now?"
    ]

    
  
    const random=(Math.floor(Math.random()*welcomeMessgaes.length))
  
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  const isLongeInput=message.includes("\n")
  
  const chats=useSelector((state)=>state.chat.chats)
  const  currentChatId = useSelector((state) => state.chat.currentChatId)

  
  const currentChat = chats[currentChatId];
  console.log(currentChat)
  
  const {handleSendMessage}=useChat()

  useEffect(() => {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`
    textarea.style.overflowY = textarea.scrollHeight > 192 ? "auto" : "hidden"
  }, [message])
  
  const handleSubmit=(async(e)=>
    {
      e.preventDefault() 
      
      const trimmedMessage=message.trim()
      
      if(!trimmedMessage) {
        return
      }
      await handleSendMessage(trimmedMessage,currentChatId)
      setMessage('')
      
    })
    
  return (
    <main className="flex h-screen relative flex-1 flex-col bg-[#111]">

     <div className="sticky  top-0 z-50 flex  h-16 items-center justify-between bg-[#30283D]/20 backdrop-blur-md px-8">
      <header>
      
        <div className="">
    
          <h2 className="mt-0.5 text-[17px] font-thin text-white ">
            {chats[currentChatId]?.title}
          </h2>
        </div>

        </header>
     </div>
      

      <section className="flex-1 overflow-y-auto px-55 py-15 ">
        
        {!currentChatId || currentChat.messages.length===0?<div className="">
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-thin leading-none text-xl text-white/60 w-full text-center ">{welcomeMessgaes[random]}</h1>
        </div>:chats[currentChatId]?.messages.map((elem,indx)=>
        {
          return (<div className="">
            <Message
            key={indx}
            role={elem.role}
            content={elem.content}
            />
          </div>)
        })}
      </section>

      <div className=" flex flex-col items-center justify-center">

        
        <div className={`flex w-[56vw] ${!isLongeInput?'rounded-full':'rounded-[20px]'} border absolute bottom-6 border-white/10 h-fit  
backdrop-blur-md px-4 py-[6px]  focus-within:border-[#7b5be6]/60`}>
  <form onSubmit={handleSubmit} className="w-full"> 
    <div className="flex min-h-9 w-full items-center justify-between gap-2">
    <textarea
    ref={textareaRef}
    value={message}
    onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
}}
    onChange={(e)=>{setMessage(e.target.value)
      // console.log(message)
    }}
    rows={1}
    placeholder="Ask Etos..."
    className="max-h-48 min-h-5 flex-1 resize-none bg-transparent relative py-1.5 text-[14px] leading-5 text-white outline-none placeholder:text-white/35"
/>          

            <button type="submit" className={`group  ${isLongeInput?'absolute bottom-2 right-2':'relative'} flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white transition-all duration-300 hover:bg-[#8b6cf1] cursor-pointer`}>

  <i className="ri-send-ins-line text-2xl absolute transition-all duration-200 group-hover:scale-0 group-hover:opacity-0"></i>

  <i className="ri-send-ins-fill absolute text-xl scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"></i>

</button>
  </div>
  </form>
          </div>

        </div>

        
         <div className="bg-[#111] w-full h-6">
           <p className="  absolute bottom-1 text-center  left-1/2 -translate-x-1/2  text-[10px] text-white/34">
          Etos by Bhaskar can make mistakes. Check important information.
        </p>
         </div>

    </main>
  );
};

export default ChatWindow;
