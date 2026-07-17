import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDraftChat, setCurrentChatId } from "../chat.slice";
import { Link, useNavigate } from "react-router";
import useAuth from "../../auth/hooks/useAuth";
import { useChat } from "../hooks/useChat";
import About from "../pages/About";

const Sidebar = ({isOpen, setIsOpen, selectChat}) => {

  const [iseHovered,setIsHovered]=useState(false)

  const auth=useSelector((state)=>state.auth)

  const [isBlock, setIsBlock] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {handleLogout}=useAuth()
  const {handleDeleteChat}=useChat()
  const displayName=auth?.user?.username || auth?.user?.identifier || "User"
  const avatarText=displayName[0]?.toUpperCase() || "U"

  const handleLogoutClick=(async()=>
  {
    try {
      await handleLogout()
    }
    catch(err) {
      console.error(err)
    }
    finally {
      setIsBlock(false)
      navigate('/login', {replace:true})
    }
  })

  const openChat=((chatId)=>
  {
    if (selectChat) {
      selectChat(chatId)
    }
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
  })

  const deleteSelectedChat=(async(e, chatId)=>
  {
    e.stopPropagation()
    try {
      await handleDeleteChat(chatId)
    }
    catch(err) {
      console.error(err)
    }
  })

  const chats=useSelector((state)=>Object.values(state.chat.chats))
  const sortedChats=[...chats].sort((a,b)=>new Date(b.lastUpdated || 0)-new Date(a.lastUpdated || 0))
  const currentChatId=useSelector((state)=>state.chat.currentChatId)

  return (
    <aside className={`fixed inset-y-0 left-0 z-[60] flex h-screen w-[82vw] max-w-[292px] shrink-0 flex-col overflow-hidden bg-neutral-900  transition-all duration-300 lg:relative lg:max-w-none ${isOpen?'translate-x-0 border-r border-white/8 lg:w-[19vw]':'-translate-x-full border-r-0 lg:w-0'}`}>

      <div className="px-5 py-5">
        <div className="flex justify-between items-center gap-1 text-white">
          <div className="flex items-center justify-center">
            <div className="grid h-8 w-8 place-items-center rounded-md text-2xl">
            <i className="text-2xl font-thin -rotate-7">&xi;</i>
          </div>
          <span className="text-xl font-thin tracking-[0]">Etos</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-md text-white/60 transition hover:bg-[#8b6cf1]hover:text-white cursor-pointer lg:hidden"
            type="button"
          >
            <i className="ri-layout-right-fill text-xl "></i>
          </button>
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
            <div
              key={elem.id}
              className={`group flex w-full items-center rounded-md px-3 py-2.5 text-left transition ${
                elem.id === currentChatId
                  ? "bg-[#30283d] text-white"
                  : "text-white/68 hover:bg-[#2B2438]/60 hover:text-white"
              }`}
            >
              <button
                onClick={()=>{
                  if (elem.isDraft) {
                    dispatch(setCurrentChatId(elem.id))
                    if (window.innerWidth < 1024) {
                      setIsOpen(false)
                    }
                    return
                  }

                  openChat(elem.id)
                }}
                className="min-w-0 flex-1 cursor-pointer text-left"
                type="button"
              >
                <h4 className="truncate text-[13px] font-medium leading-5">
                  {elem.title}
                </h4>
              </button>

              <button
                onClick={(e)=>deleteSelectedChat(e, elem.id)}
                className="ml-2 grid h-7 w-7 shrink-0 place-items-center rounded-md text-white/35 opacity-100 transition hover:bg-red-500/10 hover:text-red-400 md:opacity-0 md:group-hover:opacity-100"
                type="button"
              >
                <i className="ri-delete-bin-6-line text-sm"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

     
      <div className="border-t border-white/8 p-4">
        <div className="flex w-full items-center gap-3 rounded-md p-2 text-left transition ">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7b5be6] text-md font-semibold text-white">
            {avatarText}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-medium text-white">
              {displayName}
            </h3>

            <p className="truncate text-xs text-white/40">
              {auth.user?.email}
            </p>
          </div>

          <div className="group">
           
              <i onClick={()=>setIsBlock(!isBlock)} className="ri-more-2-fill cursor-pointer  hover:text-white/70 text-lg text-white/42"></i>
          
          <div
  className={`
    absolute lg:bottom-[11.2vh] bottom-[9vh] right-[2vw] lg:left-[3vw] z-50
    w-56 overflow-hidden
    rounded-2xl
    border border-white/10
    bg-[#18161A]/10
    backdrop-blur-xl
    shadow-[0_20px_60px_rgba(0,0,0,0.55)]
    transition-all duration-200
    origin-bottom-right
    ${
      isBlock
        ? "scale-100 opacity-100 translate-y-0"
        : "pointer-events-none scale-75 opacity-0 translate-y-2"
    }
  `}
>
  <Link to='/about'>
  <button
    className="group relative cursor-pointer flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/[0.06]"
  >
    <i className="ri-information-line text-lg text-white/60 group-hover:text-white"></i>

    <span className="text-[15px] font-medium text-white/80 group-hover:text-white">
      About
    </span>
  </button>
  </Link>

  <div className="mx-3  h-[.1px] bg-white/10" />

  <button onMouseEnter={()=>setIsHovered(true)}
   onMouseLeave={()=>setIsHovered(false)} 
    className="group/settings relative cursor-pointer flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/[0.06]"
  >
    <i className="ri-settings-3-line text-lg text-white/60 group-hover:text-white"></i>

    <span className="text-[15px]
    font-medium
    text-white/80
    transition-all
    duration-300
    group-hover/settings:text-green-400/80
    ">
      {iseHovered?'Coming soon':'Settings'}
    </span>
  </button>
  

  <div className="mx-3 h-[.1px] bg-white/10" />

  <button
    onClick={handleLogoutClick}
    className="group cursor-pointer flex w-full items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-red-500/10"
    type="button"
  >
    <i className="ri-logout-box-r-line text-lg text-red-400"></i>

    <span className="text-[15px] font-medium text-red-400">
      Logout
    </span>
  </button>
</div>
          </div>

        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
