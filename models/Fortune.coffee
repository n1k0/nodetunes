mongoose = require "mongoose"

Fortune = new mongoose.Schema
    title:
        type: String
        trim: true
        required: true
        validate: [
            (v) -> v.length >= 3 and v.length <= 255,
            "Title length must be comprised between 3 and 255 chars"
        ]
    content:
        type: String
        trim: true
        required: true
        validate: [
            (v) -> v.length >= 10 and v.length <= 5000,
            "Contents length must be comprised between 10 and 5000 chars"
        ]
    date:
        type: Date
        default: Date.now
        index: true

module.exports = mongoose.model 'Fortune', Fortune
