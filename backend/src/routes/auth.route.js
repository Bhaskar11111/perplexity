const express=require('express')
const router=express.Router()
const authController=require('../controller/auth.controller')
const {registerValidator,loginValidator}=require('../validator/auth.validator')
const authMiddleware=require('../middleware/auth.middleware')

router.post('/register',registerValidator,authController.registerController)

router.get('/verify-email',authController.verifyEmailController)

router.post('/login',loginValidator,authController.loginController)

router.get('/getUser',authMiddleware.authUser,authController.getUserController)

router.post('/logout',authMiddleware.authUser,authController.logoutController)

module.exports=router
