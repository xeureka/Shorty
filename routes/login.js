

const express = require('express')
const router = express.Router()
const validateUser = require('../middleware/validator')
const Users = require('../models/user.model')

router.post('/',validateUser, async (req,res) => {

    try {

        let user = await Users.findOne({email: req.body.email})

        if (!user){
            return res.redirect('/register')
        }
        
        const token = user.generateToken()

        res.header('x-auth-token',token).send(token)
        
    } catch (error) {
        res.send(404).send(error.message)
        console.log('Error ',error)
    }

})

module.exports = router

// we need the email from the user
// we verify the email
// send the token t the user and rediret it the the url generator page