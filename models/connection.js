
require('dotenv').config()
const mongoose = require('mongoose')

async function connectDB(){

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo db connected successfully !!')
        
    } catch (error) {
        console.log('Error connection mongodb, ',error.message)
    }

}


module.exports = connectDB;