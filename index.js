
const express = require('express')
const connectDB = require('./models/connection')
const app = express()
const cors = require('cors')
const urlRoutes = require('./routes/urls')

app.use(cors())
app.use(express.json())


app.use('/',urlRoutes) 


connectDB()

app.listen(3000, () => {
    console.log('Server is running at port 3000 !!')
})

