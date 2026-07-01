const aiService=require('../services/ai.service')
const chatModel = require('../model/chat.model')
const messageModel=require('../model/message.model')

const sendMessage=(async(req,res)=>
{
    const {message}=req.body
    const result=await aiService.generateResponse(message)

    const title=await aiService.generateChatTitle(message)

    const chat=await chatModel.create({
        user:req.user.id,
        title
    })

    const userMessage=await messageModel.create({
        chat:chat._id,
        content:message,
        role:"user"
    })

    const aiMessage=await messageModel.create({
        chat:chat._id,
        content:result,
        role:"ai"
    })

    console.log(title)

    return res.status(201).json({
       title,
       chat,
       aiMessage
    })
})

module.exports={
    sendMessage
}