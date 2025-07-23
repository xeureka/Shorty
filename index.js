
const express = require('express')
const connectDB = require('./models/connection')
const app = express()
const cors = require('cors')
const cron = require('node-cron')
const urlRoutes = require('./routes/urls')
const expiredOldLinks = require('./services/expirationCron')

app.use(cors())
app.use(express.json())


app.use('/',urlRoutes) 

cron.schedule('0 0 * * *', () => {
  console.log('checking for expired links....');
  expiredOldLinks()
});

connectDB()

app.listen(3000, () => {
    console.log('Server is running at port 3000 !!')
})
