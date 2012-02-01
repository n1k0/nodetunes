(function() {
  var MongoStore, NotFound, app, coffeekup, config, connect, express, mongoose, normalize, projectRoot, routes;

  coffeekup = require("coffeekup");

  express = require("express");

  normalize = require("path").normalize;

  mongoose = require("mongoose");

  MongoStore = require("express-session-mongo-russp");

  config = require("./config");

  routes = require("./routes");

  NotFound = require("./lib/errors").NotFound;

  connect = function(uri, callback, onerror) {
    return mongoose.connect(uri, function(err) {
      if (err) {
        console.error("Unable to connect to MongoDB at " + this.uri + ":\n\t" + err);
        process.nextTick(function() {
          return typeof onerror === "function" ? onerror(err) : void 0;
        });
      }
      return process.nextTick(function() {
        return typeof callback === "function" ? callback() : void 0;
      });
    });
  };

  app = module.exports = express.createServer();

  projectRoot = "" + __dirname + "/../";

  app.configure(function() {
    this.use(express.errorHandler());
    this.set("views", normalize("" + projectRoot + "/src/views"));
    this.set("view engine", "coffee");
    this.register('.coffee', coffeekup.adapters.express);
    return this.use(express.static("" + projectRoot + "/public"));
  });

  app.configure("development", function() {
    var db;
    db = connect(config.development.mongo.uri);
    this.set("view options", {
      format: true,
      autoescape: true
    });
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(express.cookieParser());
    this.use(express.session({
      secret: "rocknroll"
    }));
    this.use(this.router);
    return this.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure("production", function() {
    var db;
    db = connect(config.production.mongo.uri);
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(express.cookieParser());
    this.use(express.session({
      cookie: {
        maxAge: 60000 * 20
      },
      store: new MongoStore({
        "native": false
      }),
      secret: "rocknroll"
    }));
    return this.use(this.router);
  });

  app.configure("test", function() {
    var db;
    db = connect(config.test.mongo.uri);
    this.use(express.bodyParser());
    this.use(express.methodOverride());
    this.use(express.cookieParser());
    this.use(express.session({
      secret: "rocknroll"
    }));
    return this.use(this.router);
  });

  app.error(function(err, req, res, next) {
    if (err instanceof NotFound) {
      return res.render('404', {
        status: 404,
        error: err,
        title: '404 Not Found'
      });
    }
    return next(err);
  });

  app.dynamicHelpers({
    helpers: function(req, res) {
      return require("./lib/helpers");
    },
    get_messages: function(req, res) {
      return req.flash();
    },
    session: function(req, res) {
      return req.session;
    },
    url: function(req, res) {
      return req.url;
    }
  });

  app.get("/", routes.index);

  app.get("/new", routes.add);

  app.post("/new", routes.add);

  app.get("/fortune/:fortune_slug", routes.show);

  app.get("*", function(req, res) {
    return res.render('404', {
      status: 404,
      title: "Not Found"
    });
  });

}).call(this);
