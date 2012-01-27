# adapted from https://github.com/twilson63/cakefile-template, thanks!

fs            = require('fs')
path          = require('path')
{print}       = require('util')
{spawn, exec} = require('child_process')

# ANSI Terminal Colors

bold  = '\033[0;1m'
green = '\033[0;32m'
reset = '\033[0m'
red   = '\033[0;31m'

# Local methods

build = (watch, callback) ->
    if typeof watch is 'function'
        callback = watch
        watch = false
    options = ['-c', '-o', 'lib', 'src']
    options.unshift '-w' if watch
    coffee = spawn 'coffee', options
    coffee.stdout.on 'data', (data) -> print data.toString()
    coffee.stderr.on 'data', (data) -> print data.toString()
    coffee.on 'exit', (status) ->
        if status is 0
            log "Sources compiled ok :)", green
            if callback? then callback()

casper = (callback) ->
    # server
    server = spawn "node", ["app.js"]
    server.stdout.on 'data', (data) -> print data.toString()
    server.stderr.on 'data', (data) -> print data.toString()
    # casper
    casper = spawn "casperjs", ["test", "casperjs"]
    casper.stdout.on 'data', (data) -> print data.toString()
    casper.stderr.on 'data', (data) -> print data.toString()
    casper.on 'exit', (status) ->
        server.kill "SIGHUP"
        callback?() if status is 0

findTestFiles = (dir) ->
    files = []
    for entry in fs.readdirSync(dir)
        if entry != "." and entry != ".."
            _entry = path.resolve "#{dir}/#{entry}"
            stats = fs.statSync _entry
            if stats.isFile(entry) and /\.coffee$/.test(_entry)
                files.push(_entry)
            else if stats.isDirectory() and entry != "views"
                files = files.concat(findTestFiles(_entry))
    files

log = (message, color, explanation) ->
    console.log color + message + reset + ' ' + (explanation or '')

server = -> require "./app"

test = (callback) ->
    command = "node_modules/.bin/_mocha --require should -R spec lib/test/*.js"
    mocha = exec command, (err, stdout, stderr) ->
        if err then print err, red
    mocha.stdout.on 'data', (data) -> print data.toString()
    mocha.stderr.on 'data', (data) -> print data.toString()
    mocha.on 'exit', (status) -> callback?() if status is 0

# Task definitions

task 'build', 'Build current project', ->
    build -> log ":)", green

task 'docs', 'Generate annotated source code with Docco', ->
    files = findTestFiles("src")
    docco = spawn 'node_modules/.bin/docco', files
    docco.stdout.on 'data', (data) -> print data.toString()
    docco.stderr.on 'data', (data) -> print data.toString()
    docco.on 'exit', (status) -> callback?() if status is 0

task 'funk', 'Fantastic stuff', ->
    build -> test -> casper -> log ":)", green

task 'test', 'Run test suite', ->
    build -> test -> log ":)", green

task 'server', 'Start server', ->
    build -> server()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
    build true
