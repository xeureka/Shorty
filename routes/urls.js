
const express = require('express')
const router = express.Router()
const Urls = require('../models/url.model')
const generateRandomUrl = require('../utils/utils')

router.post('/', async (req,res) =>{ 
    const {longUrl} = req.body;
    const shortCode = generateRandomUrl()

    try {
        let url = new Urls({
            longUrl,
            shortCode
        })

        await url.save()
                
        res.json({shortUrl: `http://localhost:3000/${shortCode}`})
        
    } catch (error) {
        res.status(500).json('Server error')
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