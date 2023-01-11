
const ChatModel = require('../Models/chatModel')

const chatController = {}

//controller to add messages
chatController.addMessage = async (req,res,next) => {
    try{
    const {from , to , message} = req.body
    const data = await ChatModel.create({
        message : {text:message},
        users : [from , to],
        sender : from
    })
    if(data) return res.json ({msg:'message added'})
    return res.json({msg:"cannot add message"})
 }catch (ex){
    next(ex)
 }
}

//controller to recive messages

chatController.reciveMessage = async (req,res,next) => {
    try {
        const {from , to} = req.body
        const messages = await ChatModel.find({
            users : {
                $all : [from,to]
            }
        }).sort({updatedAt : 1})
        const projectedMsgs = messages.map((msg)=>{
            return {
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text
            }
        })
        res.json(projectedMsgs)
    }catch(ex){
        next(ex)
    }
}

module.exports = chatController