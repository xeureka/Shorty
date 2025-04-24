
const express = require('express')
const router = express.Router()
const Urls = require('../models/url')
const shortid = require('shortid')


router.post('/short', async (req,res) =>{

    const {longUrl} = req.body;
    const shortCode = shortid.generate()

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

<<<<<<< HEAD
        const url = await Urls.find()
=======
        const url = await Urls.findOne({shortCode: req.params.shortCode})
>>>>>>> 0d815f4f4e5d41ab6dc43273a4ab929eb0151dbb

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