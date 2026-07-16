import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import {useChat} from '../hooks/useChat.js'

const ChatWindow = ({isSideBarOpen,setIsSideBarOpen}) => {

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

  const [welcomeMessage] = useState(() => welcomeMessgaes[Math.floor(Math.random()*welcomeMessgaes.length)])
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)
  const messagesEndRef = useRef(null)
  const previousChatIdRef = useRef(null)

  const isLongeInput=message.includes("\n")||message.length>40
  
  const chats=useSelector((state)=>state.chat.chats)
  const auth=useSelector((state)=>state.auth.user)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const currentChat = chats[currentChatId];
  const userInitial=(auth?.username?.[0] || auth?.identifier?.[0] || "U").toUpperCase()
  
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

  useEffect(() => {
    if (!currentChatId || !currentChat?.messages.length) {
      return
    }

    const chatChanged=previousChatIdRef.current !== currentChatId
    previousChatIdRef.current = currentChatId

    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: chatChanged ? "auto" : "smooth",
        block: "end"
      })
    })
  }, [currentChatId, currentChat?.messages.length])
  
  const handleSubmit=(async(e)=>
    {
      e.preventDefault() 
      
      const trimmedMessage=message.trim()
      
      if(!trimmedMessage) {
        return
      }
      setMessage('')
      await handleSendMessage(trimmedMessage,currentChatId)
      
    })
    
  return (
    <main className="flex h-screen min-w-0 flex-1 flex-col bg-[#111]">

     <div className="sticky top-0 z-50 flex h-16 items-center justify-between bg-[#30283D]/20 px-4 backdrop-blur-md sm:px-6 lg:px-8" >

     <div className="flex items-center w-1/2 justify-between"> 
     <div className="">
      <i onClick={()=>setIsSideBarOpen(!isSideBarOpen)} className={`${!isSideBarOpen?'ri-layout-left-line':'ri-layout-right-fill'} text-xl font-thin text-white/60 grid h-8 w-8 place-items-center rounded-md text-white/60 transition hover:bg-[#8b6cf1] hover:text-white cursor-pointer cursor-pointer hover:text-white/80`}></i>
     </div>
     <div className={`md:flex lg:flex hidden  absolute left-1/2 -translate-x-1/2 items-center ${isSideBarOpen?'scale-0  transition-all':'scale-100 transition-all'} text-white `}>
      <span className="grid h-8 w-8 place-items-center rounded-md text-2xl font-thin rotate-3">&xi;</span>
      <span className="text-xl font-thin tracking-[0]">Etos</span>
     </div>
     </div>
  
     
      <header>
      
        <div className="">
    
          <h2 className="mt-0.5 text-[17px] font-thin text-white ">
            {chats[currentChatId]?.title}
          </h2>
        </div>

        </header>
     </div>
      

      <section className="relative flex-1 overflow-y-auto px-4 py-20 pb-32 sm:px-8 md:px-16 lg:px-32 xl:px-55">
        
        {!currentChatId || currentChat?.messages.length===0?<div className="">
          <h1 className="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 text-center text-xl font-thin leading-snug text-white/60 sm:w-full sm:leading-none">{welcomeMessage}</h1>
        </div>:chats[currentChatId]?.messages.map((elem,indx)=>
        {
          const isNearBottom=indx >= chats[currentChatId].messages.length - 8
          return (<div key={elem.id || `${elem.role}-${indx}`} className="">
            <Message
            role={elem.role}
            content={elem.content}
            shouldAnimate={elem.shouldAnimate}
            isPending={elem.isPending}
            userInitial={userInitial}
            eagerRender={isNearBottom}
            />
          </div>)
        })}
        <div ref={messagesEndRef} />
      </section>

      <div className=" flex flex-col items-center justify-center ">

        
        <div className={`absolute bottom-6 flex h-fit w-[calc(100%-2rem)] max-w-4xl sm:w-[80vw] lg:w-[56vw] ${!isLongeInput?'rounded-full':'rounded-[20px]'} border border-white/10  
       backdrop-blur-sm px-4 py-[6px]  focus-within:border-[#7b5be6]/60`}>
  <form onSubmit={handleSubmit} className="w-full"> 
    <div className="flex min-h-9 items-center justify-between ">
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
    className="max-h-48 min-h-5 flex-1 resize-none  overflow-hidden relative  text-[14px] leading-5 text-white outline-none placeholder:text-white/35"
/>          

            <button type="submit" className={`group  ${isLongeInput?'absolute bottom-2 right-2':'relative'} absolute right-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white transition-all duration-300 hover:bg-[#8b6cf1] cursor-pointer`}>

  <i className="ri-send-ins-line text-2xl absolute transition-all duration-200 group-hover:scale-0 group-hover:opacity-0"></i>

  <i className="ri-send-ins-fill absolute text-xl scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"></i>

</button>
  </div>
  </form>
          </div>

        </div>

        
         <div className="bg-[#111] w-full h-6">
           <p className={`${isSideBarOpen?'opacity-0 transition-all duration-300':'opacity-100 transition-all duration-300'} absolute bottom-1 left-[50%] w-full -translate-x-1/2 px-4 text-center text-[10px] text-white/34`}>
          Etos by Bhaskar can make mistakes. Check important information.
        </p>
         </div>

    </main>
  );
};

export default ChatWindow;
