const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ChatUser = require('../Models/userModel')

const userController = {}

//controller to add user
userController.create = (req,res) => {
    const data = req.body
    const user = new ChatUser(data)
    bcrypt.genSalt()
    .then((salt)=>{
        bcrypt.hash(data.password,salt)
        .then((encrypted)=>{
            user.password = encrypted
            user.save()
            .then((data)=>{
                res.json(data)
                console.log(data)
            })
            .catch((err)=>{
                res.json(err)
            })
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    .catch((err)=>{
        res.json(err)
    })
}


//controller for user login
userController.login=(req,res)=>{
    const data = req.body
    ChatUser.findOne({userName:data.userName})
    .then((user)=>{
        if(!user){
            console.log('incorrect userName or password')
        }
        bcrypt.compare(data.password,user.password)
        .then((verified)=>{
            const payload = {
                id : user._id,
                name : user.name,
                createdAt : user.createdAt
            }
            const token = jwt.sign(payload,'user123',{expiresIn:'1d'})
            const result = {
                token : `${token}`,
                id : user._id,
                name : user.name,
                userName : user.userName
            }
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    .catch((err)=>{
        res.json(err)
    })
}

//constroller for show all the contacts except current user
userController.show = (req,res)=>{
    ChatUser.find({_id: {$ne: req.params.id}}).select([
    "_id","name","userName"
   ])
    .then((users)=>{
        res.json(users)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports = userController