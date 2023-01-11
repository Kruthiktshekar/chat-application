const mongoose = require('mongoose')
const Schema = mongoose.Schema


//user schema
const userSchema = new Schema({
    name : {
        type : String,
        required : true
        
    },
    userName : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }
})

//user Model
const ChatUser = mongoose.model('ChatUser',userSchema)

module.exports = ChatUser