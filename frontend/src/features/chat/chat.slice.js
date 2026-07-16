import { createSlice } from "@reduxjs/toolkit"

const chatSlice=createSlice({
    name:'chat',
    initialState:{
        chats:{},
        currentChatId:null,
        loading:false,
        error:null
    },
    reducers:{

        createDraftChat:((state,action)=>
        {
            const chatId=action.payload?.chatId || `draft-${Date.now()}`

            state.chats[chatId] = {
                id: chatId,
                title: "New chat",
                messages: [],
                lastUpdated: new Date().toISOString(),
                isDraft: true
            }
            state.currentChatId = chatId
        }),

        replaceDraftChat:((state,action)=>
        {
            const {draftChatId, chatId, title}=action.payload
            const draftChat=state.chats[draftChatId]

            if (draftChat) {
                delete state.chats[draftChatId]
            }

            state.chats[chatId] = {
                id: chatId,
                title,
                messages: draftChat?.messages || [],
                lastUpdated: new Date().toISOString(),
                isDraft: false
            }
            state.currentChatId = chatId
        }),

        createNewChat:((state,action)=>
        {
            const {chatId,title}=action.payload
            if (!state.chats[chatId]) {
        state.chats[chatId] = {
            id: chatId,
            title,
            messages: [],
            lastUpdated: new Date().toISOString(),
            isDraft: false
        };
    }
            else {
                state.chats[chatId].title = title
                state.chats[chatId].isDraft = false
                state.chats[chatId].lastUpdated = new Date().toISOString()
            }
        }),

        addMessage:((state,action)=>
        {
            const {chatId,id,content,role,shouldAnimate=false,isPending=false}=action.payload
            if (!state.chats[chatId]) {
                return
            }
            state.chats[chatId].messages.push({id,content,role,shouldAnimate,isPending})
            state.chats[chatId].lastUpdated = new Date().toISOString()
        }),

        updateMessage:((state,action)=>
        {
            const {chatId,messageId,content,role,shouldAnimate=false,isPending=false}=action.payload
            const chat=state.chats[chatId]
            if (!chat) {
                return
            }
            const message=chat.messages.find((elem)=>elem.id===messageId)
            if (!message) {
                return
            }
            message.content=content
            message.role=role
            message.shouldAnimate=shouldAnimate
            message.isPending=isPending
            chat.lastUpdated = new Date().toISOString()
        }),

        addFollowMessages:((state,action)=>
        {
            const {chatId, messages}=action.payload
            if (!state.chats[chatId]) {
                return
            }
            state.chats[chatId].messages = messages
        }),

        setChats:((state,action)=>
        {
            state.chats=action.payload
        }),
        clearChats:((state)=>
        {
            state.chats={}
            state.currentChatId=null
            state.loading=false
            state.error=null
        }),
        setCurrentChatId:((state,action)=>
        {
            state.currentChatId=action.payload
        }),
        setLoading:((state,action)=>
        {
            state.loading=action.payload
        }),
        setError:((state,action)=>
        {
            state.error=action.payload
        })
    }
})

export const {setChats,clearChats,setCurrentChatId,setLoading,setError,createDraftChat,replaceDraftChat,createNewChat,addMessage,updateMessage,addFollowMessages}=chatSlice.actions

export default chatSlice.reducer
