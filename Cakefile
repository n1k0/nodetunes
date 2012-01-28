# adapted from https://github.com/twilson63/cakefile-template, thanks!

fs             = require('fs')
mongoose       = require('mongoose')
path           = require('path')
{print}        = require('util')
{spawn, exec}  = require('child_process')
{fortunes}     = require('./src/fixtures')
Fortune        = require('./src/models/Fortune')

# locals

mongoUrl = 'mongodb://localhost/nodetunes-test'

# ANSI Terminal Colors

ansi =
    bold:  '\033[0;1m'
    blue:  '\033[0;36m'
    green: '\033[0;32m'
    reset: '\033[0m'
    red:   '\033[0;31m'

# Local methods

build = (watch, callback) ->
    if typeof watch is 'function'
        callback = watch
        watch = false
    info "building sources…"
    options = ['-c', '-o', 'lib', 'src']
    options.unshift '-w' if watch
    coffee = spawn 'coffee', options
    coffee.stdout.on 'data', (data) -> print data.toString()
    coffee.stderr.on 'data', (data) -> print data.toString()
    coffee.on 'exit', (status) ->
        if status is 0
            ok "sources built ok"
            if callback? then callback()

casper = (callback) ->
    # server
    info "running test server…"
    process.env.NODE_ENV = "test"
    server = spawn "node", ["app.js"]
    server.stdout.on 'data', (data) -> print data.toString()
    server.stderr.on 'data', (data) -> print data.toString()
    # casper
    info "launching casperjs test suite…"
    casper = spawn "casperjs", ["test", "casperjs"]
    casper.stdout.on 'data', (data) -> print data.toString()
    casper.stderr.on 'data', (data) -> print data.toString()
    casper.on 'exit', (status) ->
        info "terminating test server…"
        server.kill "SIGHUP", -> ok "server terminated"
        if status is 0
            ok "casper test suite ok"
        else
            ko "casper test suite failed"
        callback?()

connect = ->
    mongoose.connect mongoUrl, (err) ->
        if err
            ko "Unable to connect to MongoDB: #{err}"
            exit()

exit = -> process.exit()

findSourceFiles = (dir) ->
    files = []
    for entry in fs.readdirSync(dir)
        if entry != "." and entry != ".."
            _entry = path.resolve "#{dir}/#{entry}"
            stats = fs.statSync _entry
            if stats.isFile(entry) and /\.coffee$/.test(_entry)
                files.push(_entry)
            else if stats.isDirectory() and entry != "views"
                files = files.concat(findSourceFiles(_entry))
    files

info = (message) -> log "⚑", ansi.blue, message

load = (callback) ->
    connect()
    Fortune.remove ->
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
                        callback?()

log = (message, color, explanation) ->
    color = ansi[color] || color
    console.log (color || '') + message + ansi.reset + ' ' + (explanation or '')

ko = (message) -> log "×", ansi.red, message

ok = (message) -> log "✓", ansi.green, message

server = -> require "./app"

test = (callback) ->
    info "launching unit test suite…"
    command = "node_modules/.bin/_mocha --require should lib/test/*.js"
    mocha = exec command, (err, stdout, stderr) ->
        if err then ko err
    mocha.stdout.on 'data', (data) -> print data.toString()
    mocha.stderr.on 'data', (data) -> print data.toString()
    mocha.on 'exit', (status) ->
        if status is 0
            ok "unit test suite ok"
        else
            ko "unit test suite failed"
        callback?()

# Task definitions

task 'build', 'Build current project', -> build()

task 'docs', 'Generate annotated source code with Docco', ->
    files = findSourceFiles("src")
    docco = spawn 'node_modules/.bin/docco', files
    docco.stdout.on 'data', (data) -> print data.toString()
    docco.stderr.on 'data', (data) -> print data.toString()
    docco.on 'exit', (status) -> callback?() if status is 0

task 'funk', 'Fantastic stuff', ->
    build -> load -> test -> casper -> exit()

task 'load', 'Load test fixtures', -> load -> exit()

task 'test', 'Run test suite', ->
    build -> test -> exit()

task 'server', 'Start server', ->
    build -> server()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
    build true, -> exit()
