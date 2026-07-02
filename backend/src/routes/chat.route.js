const express=require('express')
const router=express.Router()
const chatController=require('../controller/chat.controller')
const authMiddleware=require('../middleware/auth.middleware')

router.post('/message',authMiddleware.authUser,chatController.sendMessage)

router.get('/',authMiddleware.authUser,chatController.getChat)

router.get('/messages/:chatId',authMiddleware.authUser,chatController.getMessages)

router.delete('/:chatId',authMiddleware.authUser,chatController.deleteChat)

module.exports=router