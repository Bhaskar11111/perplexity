require('dotenv').config()
const jwt=require('jsonwebtoken')

const blacklistedTokens=new Map()

const blacklistToken=((token, expiresAt)=>
{
    if(token)
    {
        blacklistedTokens.set(token, expiresAt)
    }
})

const isTokenBlacklisted=((token)=>
{
    const expiresAt=blacklistedTokens.get(token)

    if(!expiresAt)
    {
        return false
    }

    if(expiresAt * 1000 <= Date.now())
    {
        blacklistedTokens.delete(token)
        return false
    }

    return true
})

const authUser=(async(req,res,next)=>
{
    const token=req.cookies.token

    
        if(!token)
    {
        return res.status(400).json({
            message:'Invalid token or token not found',
            success:false,
            err:'No token'
        })
    }
    if(isTokenBlacklisted(token))
    {
        res.clearCookie('token')
        return res.status(401).json({
            message:'Token has been logged out',
            success:false,
            err:'Blacklisted token'
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded
        req.token=token

        next()
    }
    catch(err){
        return res.status(401).json({
            message:'Invalid token',
            success:false,
            err:err.message
        })
    }
})

module.exports=
{
    authUser,
    blacklistToken
}
