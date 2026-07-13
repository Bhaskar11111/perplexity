import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDraftChat, setCurrentChatId } from "../chat.slice";

const Sidebar = ({selectChat}) => {

  const [isBlock, setIsBlock] = useState(false)

  const dispatch = useDispatch()

  const openChat=((chatId)=>
  {
    selectChat(chatId)
  })

  const chats=useSelector((state)=>Object.values(state.chat.chats))
  const sortedChats=[...chats].sort((a,b)=>new Date(b.lastUpdated || 0)-new Date(a.lastUpdated || 0))
  const currentChatId=useSelector((state)=>state.chat.currentChatId)

  return (
    <aside className="w-[292px] h-screen bg-neutral-900 border-r border-white/8 flex flex-col">

      <div className="px-5 py-5">
        <div className="flex items-center gap-1 text-white">
          <div className="grid h-8 w-8 place-items-center rounded-md text-2xl">
            <i className="text-2xl font-thin">ξ</i>
          </div>
          <span className="text-xl font-thin tracking-[0]">Etos</span>
          
        </div>
      </div>
   
      <div className="px-4">
        <button
          onClick={() => dispatch(createDraftChat())}
          className="flex h-10 w-full items-center justify-center gap-1 text-center rounded-md bg-neutral-800 text-sm font-medium text-white transition hover:bg-[#8b6cf1] cursor-pointer"
        >
          <i className="ri-add-line text-base mt-[3px]"></i>
          New chat
        </button>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto px-3">

       {sortedChats.length>0?<h3 className="mb-2 px-2 text-xs font-regular uppercase tracking-[0.08em] text-white/42">
          Recent
        </h3>:<h1 className="mb-2 px-2 text-xs font-regular uppercase tracking-[0.08em] text-white/42">Start a conversation</h1>}

        <div className="space-y-1">
          {sortedChats.map((elem) => (
            <button
              onClick={()=>{
                if (elem.isDraft) {
                  dispatch(setCurrentChatId(elem.id))
                  return
                }

                openChat(elem.id)
              }}
              key={elem.id}
              className={`group cursor-pointer w-full rounded-md px-3 py-2.5 text-left transition ${
                elem.id === currentChatId
                  ? "bg-[#30283d] text-white"
                  : "text-white/68 hover:bg-[#2B2438]/60 hover:text-white"
              }`}
            >
              <h4 className="truncate text-[13px] font-medium leading-5">
                {elem.title}
              </h4>

            </button>
          ))}
        </div>
      </div>

     
      <div className="border-t border-white/8 p-4">
        <button className="flex w-full items-center gap-3 rounded-md p-2 text-left transition ">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7b5be6] text-xs font-semibold text-white">
            BM
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-medium text-white">
              Bhaskar Mishra
            </h3>

            <p className="truncate text-xs text-white/40">
              bhaskar@gmail.com
            </p>
          </div>

          <div className="group">
           
              <i onClick={()=>setIsBlock(!isBlock)} className="ri-more-2-fill cursor-pointer  hover:text-white/70 text-lg text-white/42"></i>
          
          <div
  className={`
    absolute bottom-[10vh] left-[14vw] z-50
    w-56 overflow-hidden
    rounded-2xl
    border border-white/10
    bg-[#18161A]/10
    backdrop-blur-xl
    shadow-[0_20px_60px_rgba(0,0,0,0.55)]
    transition-all duration-200
    origin-bottom-left
    ${
      isBlock
        ? "scale-100 opacity-100 translate-y-0"
        : "pointer-events-none scale-75 opacity-0 translate-y-2"
    }
  `}
>
  <button
    className="group flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/[0.06]"
  >
    <i className="ri-information-line text-lg text-white/60 group-hover:text-white"></i>

    <span className="text-[15px] font-medium text-white/80 group-hover:text-white">
      About
    </span>
  </button>

  <div className="mx-3 h-px bg-white/10" />

  <button
    className="group flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/[0.06]"
  >
    <i className="ri-settings-3-line text-lg text-white/60 group-hover:text-white"></i>

    <span className="text-[15px] font-medium text-white/80 group-hover:text-white">
      Settings
    </span>
  </button>

  <div className="mx-3 h-px bg-white/10" />

  <button
    className="group flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-red-500/10"
  >
    <i className="ri-logout-box-r-line text-lg text-red-400"></i>

    <span className="text-[15px] font-medium text-red-400">
      Logout
    </span>
  </button>
</div>
          </div>

        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
