const mongoose = require('mongoose')


const urlSchema = new mongoose.Schema({
    longUrl: {type: String},
    shortCode: {type: String},
    createdAt: {type: Date, default: Date.now},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}
})


const Urls = mongoose.model('Url',urlSchema)


module.exports = Urls