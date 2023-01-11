const express = require('express')
const route = express.Router()

const chatController = require('../APP/Controllres/chatController')

const userController = require('../APP/Controllres/userController')

route.post('/api/register',userController.create)
route.post('/api/login',userController.login)
route.get('/api/getAll/:id',userController.show)

route.post('/api/sendChat',chatController.addMessage)
route.post('/api/getChat',chatController.reciveMessage)

module.exports = route