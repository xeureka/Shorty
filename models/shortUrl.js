
const mongoose = require('mongoose')
const shortId = require('shortid')


const shorturlSchema = new mongoose.Schema({

    full:{
        type: String,
        required: true
    },

    short: {
        type: String,
        default: shortId.generate(full)
    },

    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

const Shorturls = mongoose.model('Shorturl',shorturlSchema )

module.exports = Shorturls
