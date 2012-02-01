# Adapted from https://github.com/twilson63/cakefile-template, thanks!

mongoose       = require('mongoose')
{print}        = require('util')
{spawn, exec}  = require('child_process')
{fortunes}     = require('./src/fixtures')
Fortune        = require('./src/models/Fortune')
config         = require('./src/config')
utils          = require('./src/lib/utils')
settings       = {}

statuses =
    clear:  '☀'
    cloudy: '☁'
    info:   '⚑'
    ko:     '✖'
    ok:     '✓'
    rainy:  '☔'
    stormy: '⚡'
    warn:   '⚠'

ansi =
    bold:   '\033[0;1m'
    blue:   '\033[0;36m'
    green:  '\033[0;32m'
    orange: '\033[0;33m'
    reset:  '\033[0m'
    red:    '\033[0;31m'

build = (watch, callback) ->
    if typeof watch is 'function'
        callback = watch
        watch = false
    info "building sources…"
    options = ['-c', '-o', 'lib', 'src']
    options.unshift '-w' if watch
    command './node_modules/.bin/coffee', options, (status) ->
        if status is 0 then ok "sources built ok"
        callback?(status)

casper = (callback) ->
    # server
    info "running test server…"
    process.env.NODE_ENV = "test"
    server = command "node", ["app.js"]
    # casper
    info "launching casperjs test suite…"
    command "casperjs", ["test", "#{__dirname}/src/test/casperjs"], (status) ->
        info "terminating test server…"
        server.kill "SIGHUP"
        if status is 0
            ok "casper test suite ok"
        else
            ko "casper test suite failed"
        callback?(status)

command = (program, args, onExit) ->
    _command = spawn program, args ?= []
    _command.stdout.on 'data', (data) -> print data.toString()
    _command.stderr.on 'data', (data) -> print data.toString()
    if onExit? then _command.on 'exit', onExit
    _command

connect = (callback) ->
    info "connecting to MongoDB: #{settings.mongo.uri}"
    mongoose.connect settings.mongo.uri, (err) ->
        if err
            ko "Unable to connect to MongoDB: #{err}"
            exit(1)
        process.nextTick -> callback?()

exit = (status) ->
    status = ~~status
    if status
        warn "looks like errors occured"
    else
        ok "looks like everything went ok"
    process.exit(status)

info = (message) -> log statuses.info, ansi.blue, message

load = (callback) ->
    connect -> Fortune.remove ->
        processed = 0
        info "loading fixtures…"
        for ref, fortune of fortunes
            do (ref) ->
                new Fortune(fortune).save (err, fortune) ->
                    if err
                        ko "Errors encountered:"
                        for error of err.errors
                            ko "- #{error}: #{err.errors[error].type}"
                    if ++processed == Object.keys(fortunes).length
                        ok "processed #{processed} fixtures."
                        callback?(err, fortune)

log = (message, color, explanation) ->
    color = ansi[color] || color || ''
    explanation ?= ''
    print "#{color}#{message}#{ansi.reset} #{explanation}\n"

ko = (message) -> log statuses.ko, ansi.red, message

ok = (message) -> log statuses.ok, ansi.green, message

server = -> require "./app"

setup = (env, callback) ->
    if typeof env is 'function'
        callback = env
    else if typeof env is 'string'
        process.env.NODE_ENV = env
    process.env.NODE_ENV ?= "development"
    if process.env.NODE_ENV not of config
        ko "Unsupported environment name: #{process.env.NODE_ENV}"
    else
        info "Using '#{process.env.NODE_ENV}' environment"
    settings = config[process.env.NODE_ENV]
    callback?()

test = (callback) ->
    info "launching unit test suite…"
    options = ['--require', 'should']
    options = options.concat(utils.findFiles("src/test", matchFiles: /\.coffee$/, excludeDirs: ["casperjs"]))
    command "./node_modules/.bin/mocha", options, (status) ->
        if status is 0 then ok "unit test suite ok" else ko "unit test suite failed"
        callback?(status)

warn = (message) -> log statuses.warn, ansi.orange, message

# Task definitions

task 'build', 'Build current project', ->
    setup -> build (status) -> exit(1 if status)

task 'casper', 'Launches casperjs test suite', ->
    setup 'test', -> build -> load -> casper (status) -> exit(1 if status)

task 'docs', 'Generate annotated source code with Docco', ->
    files = utils.findFiles("src", matchFiles: /\.coffee$/, excludeDirs: "views")
    setup -> command './node_modules/.bin/docco', files, (status) -> exit(1 if status)

task 'funk', 'Fantastic stuff', ->
    setup 'test', -> build -> load -> test -> casper (status) -> exit(1 if status)

task 'load', 'Load test fixtures', ->
    setup -> load (err) -> exit(1 if err)

task 'test', 'Run test suite', ->
    setup 'test', -> build -> test (status) -> exit(1 if status)

task 'server', 'Start server', ->
    setup -> build -> server()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
    setup -> build true, (status) -> exit(1 if status)
