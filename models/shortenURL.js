const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
    originalURL: { type: String, require },
    shortURL: { type: String, require },
    createDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('URL', urlSchema)