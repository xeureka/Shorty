
const express = require('express')
const router = express.Router()
const Urls = require('../models/url.model')
const generateRandomUrl = require('../utils/utils')
const jwt = require('jsonwebtoken')

router.post('/', async (req,res) =>{

    const {longUrl} = req.body;
    const shortCode = generateRandomUrl()

    try {

        const authToken = req.headers['x-auth-token']
        const decoded = jwt.decode(authToken)


        let url = new Urls({
            longUrl,
            shortCode,
            owner: decoded._id
        })

        await url.save()

        res.send(url)

        res.json({shortUrl: `http://localhost:3000/${shortCode}`})
        
    } catch (error) {
        res.status(500).json('Server error')
    }
})

// a route to see all the current history of the user

router.get('/history', async (req,res) => {

    try {
        const authToken = req.headers['x-auth-token']
        const decoded = jwt.decode(authToken)

        const History = await Urls.findOne({owner: decoded._id})

        res.send(History)
  
    } catch (error) {
        res.status(404).send('Eror fetching data, ', error.message)
        console.log('Error, Fetching history, ',error)
    }
})

router.get('/:shortCode', async (req,res) =>{

    try {

        const url = await Urls.findOne({shortCode: req.params.shortCode})

        if (url){
            return res.redirect(url.longUrl)
        } else{
            return res.status(404).json('No URL found !!')
        }
        
    } catch (error) { 
        res.status(500).json('Server error')
    }
})

module.exports = router;