const aiService=require('../services/ai.service')
const chatModel=require('../model/chat.model')
const messageModel=require('../model/message.model')
const userModel=require('../model/user.model')

const sendMessage=(async(req,res)=>{
    {
        const {message, chat:chatId}=req.body
           
        
        let chat, title;
        
        if(!chatId)
            {
                //creates chat title
                title=await aiService.generateTitle(message)   
                
                console.log(title)
                
                //creates a new chat
        chat=await chatModel.create({   
            user:req.user.id,
            title
        })
        }
        else {
            chat = await chatModel.findById(chatId)
        }
        
        const userMessage=await messageModel.create({
            chat:chat.id,
            content:message,
            role:"user"
        })

        
        const allMessages=await messageModel.find({chat:chatId || chat.id})
        
        console.log(allMessages)


        const result=await aiService.generateResponse(allMessages)


        const aiMessage=await messageModel.create({
            chat:chat.id,
            content:result,
            role:"ai"
        })


        return res.status(201).json({
            title,
            chat,
            aiMessage
        })
    }
})

const getChat=(async(req,res)=>
{
    const chat=await chatModel.find({
        user:req.user.id
    })

    return res.status(200).json({
        message:'Chat retrieved successfully',
        chat
    })
})

const getMessages=(async(req,res)=>
{
    const {chatId}=req.params

    const chat=await chatModel.find({
        user:req.user.id,
        _id:chatId
    })

    if(!chat)
    {
        return res.status(404).json({
            message:'Chat not found'
        })
    }

    const messages=await messageModel.find({
        chat:chatId
    })

    return res.status(200).json({
        message:'Messages retrieved successfully',
        messages
    })
})

const deleteChat=(async(req,res)=>
{
    const {chatId}=req.params

    const chat=await chatModel.findOneAndDelete({
        _id:chatId,
        user:req.user.id
    })

    await messageModel.deleteMany({
        chat:chatId
    })

    if(!chat)
    {
        return res.status(404).json({
            message:'Chat not found'
        })
    }

    return res.status(200).json({
        message:'Chat deleted successfully',
        chat
    })
})

module.exports={
    sendMessage,
    getChat,
    getMessages,
    deleteChat
}