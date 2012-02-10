mongoose  = require "mongoose"
{slugify} = require "../lib/helpers"

### Comment model ###
Comment = new mongoose.Schema
    author:
        type: String
        trim: true
        required: true
        validate: [
            (v) -> v.length >= 3 and v.length <= 50,
            "Author name length must be comprised between 3 and 50 chars"
        ]
    email:
        type: String
        trim: true
        required: true
    content:
        type: String
        trim: true
        required: true
        validate: [
            (v) -> v.length < 500,
            "Contents length must be less than 500 chars"
        ]
    date: type: Date, default: Date.now, index: true

Comment.path('email').validate (v) ->
    # "Email length must be comprised between 3 and 255 chars"
    v.length >= 3 and v.length <= 255
, "length"

Comment.path('email').validate (v) ->
    # "Email address is invalid"
    /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v)
, "regexp"

### Fortune model ###
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
    votes: type: Number, default: 0, index: true
    date: type: Date, default: Date.now, index: true
    comments  : [Comment]

Fortune.pre 'validate', (next) ->
    @slug = slugify @title
    next()

Fortune.methods.voteDown = (callback) ->
    @votes--
    @save -> callback?(arguments...)

Fortune.methods.voteUp = (callback) ->
    @votes++
    @save -> callback?(arguments...)

Fortune.statics.findLatest = (options, callback) ->
    query = @find().desc("date")
    query.limit(options.limit) if options.limit
    query.execFind (err, fortunes) -> callback?(err, fortunes)

Fortune.statics.findOneBySlug = (slug, callback) ->
    @findOne slug: slug, callback

Fortune.statics.findTop = (options, callback) ->
    query = @find().desc("votes")
    query.limit(options.limit) if options.limit
    query.execFind (err, fortunes) -> callback?(err, fortunes)

Fortune.statics.findWorst = (options, callback) ->
    query = @find().asc("votes")
    query.limit(options.limit) if options.limit
    query.execFind (err, fortunes) -> callback?(err, fortunes)

module.exports = mongoose.model 'Fortune', Fortune
