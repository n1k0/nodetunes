#!/usr/bin/env coffee

express = require "express"
mongoose = require "mongoose"
routes = require "./routes"
coffeekup = require "coffeekup"

class NotFound extends Error
    constructor: (@path) ->
        @.name = "NotFound"
        if path
            Error.call @, "Cannot find #{path}"
            @.path = path
        else
            Error.call @, "Not Found"
        Error.captureStackTrace @, arguments.callee

app = module.exports = express.createServer()

app.configure ->
    @set "views", "#{__dirname}/views"
    @set "view engine", "coffee"
    @register '.coffee', coffeekup.adapters.express
    @use express.bodyParser()
    @use express.methodOverride()
    @use express.cookieParser()
    @use express.session(secret: "rocknroll")
    @use @router
    @use express.static "#{__dirname}/public"

app.configure "development", ->
    mongoose.connect 'mongodb://localhost/nodetunes-dev'
    @use express.errorHandler
        dumpExceptions: true
        showStack: true

app.configure "production", ->
    mongoose.connect 'mongodb://localhost/nodetunes'
    @use express.errorHandler()

app.dynamicHelpers
    get_messages: (req, res) -> req.flash()
    session: (req, res) -> req.session

app.get "/", routes.index
app.get "/add", routes.add
app.post "/add", routes.add
app.get "/fortune/:fortuneId", routes.show

app.error (err, req, res, next) ->
    if err instanceof NotFound
        return res.render '404',
            status: 404,
            error: err,
            title: '404 Error - Page Not Found'
    next err

# app.param 'fortuneId', (req, res, next, id) ->
#     fortunes = require("./models/fortune").fortunes
#     if not fortunes.find ~~id
#         return res.render "404",
#             status: 404
#             title: "Fortune not found"
#             message: "Fortune with id=#{id} not found"
#     next()

app.listen 3000
console.log "Server listening on port #{app.address().port} in #{app.settings.env} mode"
