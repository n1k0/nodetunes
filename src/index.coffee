coffeekup   = require("coffeekup")
express     = require("express")
{normalize} = require("path")
mongoose    = require("mongoose")
MongoStore  = require("express-session-mongo-russp")
config      = require("./config")
routes      = require("./routes")
{NotFound}  = require("./lib/errors")

connect = (uri, callback, onerror) ->
    mongoose.connect uri, (err) ->
        if err
            console.error "Unable to connect to MongoDB at #{@uri}:\n\t#{err}"
            onerror?(err)
        callback?()

app = module.exports = express.createServer()

# Standard configuration.
app.configure ->
    @use express.errorHandler()
    @set "views", normalize "#{__dirname}/../src/views" # oddity
    @set "view engine", "coffee"
    @register '.coffee', coffeekup.adapters.express
    @use express.static("#{__dirname}/public")

# Configuring the *development* environment.
app.configure "development", ->
    db = connect config.development.mongo.uri
    # Pretty HTML template formatting
    @set "view options", format: true, autoescape: true
    @use express.bodyParser()
    @use express.methodOverride()
    @use express.cookieParser()
    @use express.session(secret: "rocknroll")
    @use @router
    @use express.errorHandler
        dumpExceptions: true
        showStack:      true

# Configuring the *production* environment.
app.configure "production", ->
    db = connect config.production.mongo.uri
    @use express.bodyParser()
    @use express.methodOverride()
    @use express.cookieParser()
    @use express.session
        cookie: maxAge: 60000 * 20 # 20 minutes
        store:  new MongoStore(native: false)
        secret: "rocknroll"
    @use @router

# Configuring the *test* environment.
app.configure "test", ->
    db = connect config.test.mongo.uri
    @use express.bodyParser()
    @use express.methodOverride()
    @use express.cookieParser()
    @use express.session(secret: "rocknroll")
    @use @router

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
