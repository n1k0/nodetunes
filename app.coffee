#!/usr/bin/env coffee

express = require "express"
mongoose = require "mongoose"
routes = require "./routes"
coffeekup = require "coffeekup"
NotFound = require("./lib/errors").NotFound

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
    # error handling
    @error (err, req, res, next) ->
        if err instanceof NotFound
            return res.render '404',
                status: 404
                error: err
                message: err.path
                title: '404 Not Found'
        next err

app.dynamicHelpers
    helpers: (req, res) -> require "./lib/helpers"
    get_messages: (req, res) -> req.flash()
    session: (req, res) -> req.session

app.get "/", routes.index
app.get "/add", routes.add
app.post "/add", routes.add
app.get "/fortune/:fortune_slug", routes.show

app.listen 3000
console.log "Server listening on port #{app.address().port} in #{app.settings.env} mode"
