
const express = require('express')
const connectDB = require('./models/connection')
const app = express()
const cors = require('cors')
const urlRoutes = require('./routes/urlRoutes')
const Register = require('./routes/users')
const login = require('./routes/login')

app.use(cors())
app.use(express.json())


app.use('/',urlRoutes)
app.use('/register',Register)
app.use('/login',login)


connectDB()

app.listen(3000, () => {
    console.log('Server Connected Sucessfully !!')
})

