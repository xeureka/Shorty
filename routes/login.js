

const express = require('express')
const router = express.Router()
const validateUser = require('../middleware/validator')
const Users = require('../models/user.model')
const bcrypt = require('bcryptjs')

router.post('/',validateUser, async (req,res) => {

    try {

        let user = await Users.findOne({email: req.body.email})

        if (!user){
            return res.redirect('/register')
        }

        let isAuth = await bcrypt.compare(req.body.password,user.password)

        if (!isAuth){
            return res.status(404).send('Email or password is incorrect !!')
        }
        const token = user.generateToken()
        res.header('x-auth-token',token).send(token)

        return res.send('/')
        

    } catch (error) {
        res.send(404).send(error.message)
        console.log('Error ',error)
    }

})

module.exports = router
