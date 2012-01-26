coffeekup   = require "coffeekup"
mongoStore  = require "connect-mongodb"
express     = require "express"
{normalize} = require "path"
mongoose    = require "mongoose"
routes      = require "./routes"
{NotFound}  = require "./lib/errors"

app = module.exports = express.createServer()

# Configuring the *development* environment.
app.configure "development", ->
    @set "db-uri", "mongodb://localhost/nodetunes-dev"
    # Pretty HTML formatting
    @set "view options", format: true, autoescape: true
    @use express.errorHandler
        dumpExceptions: true
        showStack: true

# Configuring the *production* environment.
app.configure "production", ->
    @set "db-uri", "mongodb://localhost/nodetunes"
    @use express.session
        store: mongoStore(@set "db-uri")
        secret: "rocknroll"
    @use express.errorHandler()

# Standard configuration.
app.configure ->
    @set "views", normalize "#{__dirname}/../src/views" # oddity
    @set "view engine", "coffee"
    @register '.coffee', coffeekup.adapters.express
    @use express.bodyParser()
    @use express.methodOverride()
    @use express.cookieParser()
    @use express.session(secret: "rocknroll")
    @use @router
    @use express.static "#{__dirname}/public"
    mongoose.connect @set "db-uri"

app.error (err, req, res, next) ->
    if err instanceof NotFound
        return res.render '404',
            status: 404
            error: err
            title: '404 Not Found'
    next err

app.dynamicHelpers
    helpers:        (req, res) -> require "./lib/helpers"
    get_messages:   (req, res) -> req.flash()
    session:        (req, res) -> req.session

app.get  "/",                       routes.index
app.get  "/add",                    routes.add
app.post "/add",                    routes.add
app.get  "/fortune/:fortune_slug",  routes.show
app.get  "*", (req, res) -> res.render '404', status: 404, title: "Not Found"

exports.app = app
