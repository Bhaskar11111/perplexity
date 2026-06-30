require('dotenv').config()
const userModel = require("../model/user.model")
const bcrypt=require('bcryptjs')
const sendEmail = require("../services/mail.service")
const{welcomeEmailTemplate}=require('../Templates/mail.template')
const jwt=require('jsonwebtoken')
const { emailVerificationSuccess } = require('../Templates/success.template')

const registerController=(async(req,res,next)=>
{
    const{username,email,password}=req.body

    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists)
    {
        return res.status(400).json({
            message:`User already exists with this email or username`,
            success:false,
            err:'User already exists'
        })
    }
    const hash=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash
    })
 
    const emailVerificationToken=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET)

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity by Bhaskar",
        html:welcomeEmailTemplate(username,emailVerificationToken)
    })

    res.status(200).json({
        message:'User registered successfully',
        success:true,
        user:{
            id:user._id,
            email,
            username
        }
    })

})

const verifyEmailController=(async(req,res,next)=>
{
    const {token}=req.query

    // console.log(token)

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)

    // console.log(decode)

    const user=await userModel.findOne({email:decode.email})

    if(!user)
    {
        return res.status(400).json({
            message:'Invalid token'
        })
    }

    user.verified=true;
    await user.save()

  
    const html=emailVerificationSuccess()
       res.send(html);
    }
    catch(err)
    {
        return res.status(400).json({
            message:'Invalid or expired token',
            success:false,
            err:err.message
        })
    }
    }
)

const loginController=(async(req,res,next)=>
{
    const{identifier,password}=req.body

    const user=await userModel.findOne({
        $or:[
            {username:identifier},
            {email:identifier},
        ]
    }).select("+password")

    if(!user)
    {
        return res.status(400).json({
            message:'Unauthorize access',
            success:false,
            err:'User not found'
        })
    }

    const hash=bcrypt.compare(password,user.password)

    if(!hash)
    {
        return res.status(400).json({
            message:'Invalid credentials',
            success:false,
            err:'Email or password is incorrect'
        })
    }

    if(!user.verified)
    {
        return res.status(400).json({
            message:'Email is not verified. Please verify your email first',
            success:false,
            err:'User not verified'
        })
    }

    const token=jwt.sign({
        id:user._id,
        identifier
    },process.env.JWT_SECRET,
{
    expiresIn:"7d"
})

    res.cookie('token',token)

    return res.status(200).json({
        message:'User logged in successfully',
        success:true,
        user:{
            id:user._id,
            identifier
        }
    })

})

const getUserController=(async(req,res)=>
{
    const userId=req.user.id
    // console.log(userId)

    const user=await userModel.findById(userId).select("-password")

    if(!user)
    {
        return res.status(401).json({
            message:'User not found',
            success:false,
            err:'User not found'
        })
    }

    return res.status(200).json({
        message:'User details fetched successfully',
        user
    })
})

module.exports=
{
    registerController,
    verifyEmailController,
    loginController,
    getUserController
}