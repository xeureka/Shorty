
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new mongoose.Schema({

    name: {type: String, required: true,minlength: 3, maxlength: 255},
    email: {type: String, required: true},
    password: {type: String, required: true,minlength: 6,maxlength: 255}
})

userSchema.methods.generateToken = function(){

    const token = jwt.sign({_id: this._id, email: this.email},config.get('jwtPrivateKey'),{expiresIn:'7d'})

    return token;
}


const Users = mongoose.model('User',userSchema)

module.exports = Users;