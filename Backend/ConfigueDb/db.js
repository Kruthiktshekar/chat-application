const mongoose = require('mongoose')

const configueDb = ()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb://localhost:27017/chat-app', {
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    .then(()=>{
        console.log('db is connected successfully')
    })
    .catch((err)=>{
        console.log('error while connecting db', err)
    })
}

module.exports = configueDb