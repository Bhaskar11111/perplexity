import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";


const ChatWindow = ({messages}) => {


  const {chats,currentChatId}=useSelector((state)=>state.chat.chats )

  const state = useSelector((state) => state);

  console.log(state);

  return (
    <main className="flex h-screen  flex-1 flex-col bg-[#111]">

     
      <header className="flex h-16 items-center justify-between border-b border-white/8 px-8">
        <div>
    
          <h2 className="mt-0.5 text-[17px] font-thin text-white">
            What is Artificial Intelligence?
          </h2>
        </div>

        
      </header>

      <section className="flex-1  overflow-y-auto px-55 py-7">
        
        {chats?.[currentChatId]?.messages.map((elem,indx)=>
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


      <div className="px-10 flex items-center justify-center">

        <div className="flex items-center w-[56vw] rounded-full border border-white/10 bg-neutral-800 h-fit p-1 backdrop-blur-xl px-5 focus-within:border-[#7b5be6]/60">
  <div className="flex items-center w-full justify-between">
    <textarea
    rows={1}
    placeholder="Ask Perplexity..."
    className="flex-1 resize-none bg-transparent text-[15px] leading-6 text-white outline-none placeholder:text-white/35"
  />          

            <button className="group relative flex h-11 w-11 items-center justify-center rounded-full text-xl text-white transition-all duration-200 hover:bg-[#8b6cf1] cursor-pointer">

  <i className="ri-send-ins-line absolute transition-all duration-200 group-hover:scale-0 group-hover:opacity-0"></i>

  <i className="ri-send-ins-fill absolute scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"></i>

</button>
  </div>
          </div>

        </div>

        <p className="mt-3 text-center mb-1 text-xs text-white/34">
          Etos by Bhaskar can make mistakes. Check important information.
        </p>

    </main>
  );
};

export default ChatWindow;
