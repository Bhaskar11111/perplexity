const aiService=require('../services/ai.service')
const chatModel=require('../model/chat.model')
const messageModel=require('../model/message.model')
const userModel=require('../model/user.model')

const sendMessage=(async(req,res)=>{
    {
        const {message, chatId}=req.body
        const image=req.file ? {
            dataUrl:`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            mimeType:req.file.mimetype,
            originalName:req.file.originalname
        } : null
        const messageContent=message?.trim() || (image ? 'Please analyze this image.' : '')
           
        if(!messageContent)
        {
            return res.status(400).json({
                message:'Message or image is required'
            })
        }
        
        let chat, title;
        
        if(!chatId)
            {
                //creates chat title
                title=await aiService.generateTitle(messageContent)   
                
                console.log(title)
                
                //creates a new chat
        chat=await chatModel.create({   
            user:req.user.id,
            title
        })
        }
        else {
            chat = await chatModel.findOne({
                _id:chatId,
                user:req.user.id
            })
        }

        if(!chat)
        {
            return res.status(404).json({
                message:'Chat not found'
            })
        }
        
        const userMessage=await messageModel.create({
            chat:chat.id,
            content:messageContent,
            role:"user",
            images:image ? [image] : []
        })

        
        const allMessages=await messageModel.find({chat:chatId || chat.id})
        
        console.log(allMessages)


        const result=image
            ? await aiService.generateImageResponse(allMessages)
            : await aiService.generateResponse(allMessages)


        const aiMessage=await messageModel.create({
            chat:chat.id,
            content:result,
            role:"ai"
        })

        chat.updatedAt=new Date()
        await chat.save()


        return res.status(201).json({
            title,
            chat,
            aiMessage
        })
    }
})

const getChat=(async(req,res)=>
{
    const chats=await chatModel.find({
        user:req.user.id
    }).sort({updatedAt:-1, _id:-1})

    return res.status(200).json({
        message:'Chats retrieved successfully',
        chats
    })
})

const getMessages=(async(req,res)=>
{
    const {chatId}=req.params

    const chat=await chatModel.findOne({
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

    if(!chat)
    {
        return res.status(404).json({
            message:'Chat not found'
        })
    }

    await messageModel.deleteMany({
        chat:chatId
    })

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
