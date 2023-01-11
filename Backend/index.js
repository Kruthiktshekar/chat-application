const express = require('express')
const cors = require('cors')
const configueDb = require('./ConfigueDb/db')
const socket = require('socket.io')

//creating server with express
const app = express()
app.use(express.json())
app.use(cors())

configueDb()

const route = require('./ConfigueDb/routes')
app.use(route)

const server = app.listen(3600,()=>{
    console.log('server started at 3600')
})

//setup for socket
const io = socket(server,{
    cors:{
        origin:'http://localhost:3000/Kruthiktshekar/chat-ap',
        credentials : true
    }
})

global.onlineUsers = new Map()

//socket to add users who are logged in
io.on("connection",(socket)=>{
    global.chatSocket = socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    //socket to differentiate bw sent and recived msg and it send the msg if the user is on online
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recive",data.messages)
        }
    })
})
