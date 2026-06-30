const { default: mongoose } = require("mongoose");

const chatSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:[true,'user is required']
        },
        title:{
            type:String,
            default:'New chat',
            trim:true
        },

    },
    {
        timeStamps:true,
    }
)

const chatModel=mongoose.model('chat',chatSchema)

module.exports=chatModel