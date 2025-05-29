const mongoose = require('mongoose')
const uri = "mongodb://127.0.0.1:27017/hotel";

const connectdb = async () =>{
    try{
        await mongoose.connect(uri)
        console.log('connect')
    }catch(e){
        console.log(e)
    }
}


module.exports = connectdb;