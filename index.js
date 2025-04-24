



const express = require('express')
const connectDB = require('./models/connection')
const app = express()


connectDB()

app.listen(3000, () => {
    console.log('Server Connected Sucessfully !!')
})