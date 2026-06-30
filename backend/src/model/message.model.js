const { default: mongoose } = require("mongoose");

const messageSchema=mongoose.Schema(
    {
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'chat',
            required:true
        },
        content:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['user','ai'],
            required:[true,'role is required']
        }

    },
    {
        timeStamps:true
    }
)

const chatModel=mongoose.model('message',messageSchema)

module.exports=chatModel