const express=require('express')
const router=express.Router()
const chatController=require('../controller/chat.controller')
const authMiddleware=require('../middleware/auth.middleware')

router.post('/message',authMiddleware.authUser, chatController.sendMessage)

module.exports=router