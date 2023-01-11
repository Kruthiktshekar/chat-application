
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//chat schema
const chatSchema = new Schema (
    {
     message : {
        text : {
            type : String,
            required : true
        }
      },
        users : Array,
        sender : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
   },
    {
        timestamps : true
    }
)

//chat model
const ChatModel = mongoose.model('ChatModel',chatSchema)

module.exports = ChatModel
