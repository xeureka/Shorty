

const express = require('express')
const router = express.Router()
const Users = require('../models/user.model')
const validateUser = require('../middleware/validator')
const bcrypt = require('bcryptjs')



router.post('/',validateUser,async (req,res) =>{

    
    try {

        let user = await Users.find({email: req.body.email})


        if (user.length > 0) return res.status(404).send('User Already Registered !!')
            

        const salt = await bcrypt.genSalt(10)

        user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt)
        })

        
        await user.save()

        const token = user.generateToken()

        res.header('x-auth-token', token).redirect('/')
        
    } catch (error) {
        res.status(401).send('Error Registering the user, ',error.message)
        console.log('Error registering the user, ',error.message)
    }
})



module.exports = router