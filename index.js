
const express = require('express')
const connectDB = require('./models/connection')
const app = express()
const Shorturl = require('./models/shortUrl')

// app.use(express.urlencoded({ extended: false}))


app.post('/shortUrls',async (req,res) =>{

    const full = "https://www.youtube.com/watch?v=UiGbCPRCz9o&t=2046s&ab_channel=GugutPodcast"

    const shorrty = await Shorturl.find()
    res.send(shorrty)
    res.send(full)

})


connectDB()

app.listen(3000, () => {
    console.log('Server Connected Sucessfully !!')
})

