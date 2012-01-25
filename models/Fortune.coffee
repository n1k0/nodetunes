mongoose = require "mongoose"
slugify = require("../lib/helpers").slugify

Fortune = new mongoose.Schema
    title:
        type: String
        trim: true
        required: true
        validate: [
            (v) -> v.length >= 3 and v.length <= 255,
            "Title length must be comprised between 3 and 255 chars"
        ]
    slug:
        type: String
        trim: true
        required: true
        validate: [
            (v) -> v.length >= 3 and v.length <= 255,
            "Slug length must be comprised between 3 and 255 chars"
        ]
        index:
            unique: true
            sparse: true
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

Fortune.pre 'validate', (next) ->
    @slug = slugify @title
    next()

Fortune.statics.findOneBySlug = (slug, callback) ->
    @findOne slug: slug, callback

module.exports = mongoose.model 'Fortune', Fortune
