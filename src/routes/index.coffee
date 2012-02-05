Fortune    = require "../models/Fortune"
{Form}     = require "../lib/form"
{NotFound} = require "../lib/errors"

exports.add = (req, res) ->
    form = new Form Fortune
    stdRes = (form) ->
        return res.render "add", form: form, title: "Add a fortune"
    if req.method != "POST"
        return stdRes form
    form.bind req.body.fortune
    form.save (err) ->
        if err
            req.flash "warning", "Unable to save fortune"
            stdRes form
        else
            req.flash "info", "Fortune added"
            res.redirect "/"

exports.down = (req, res, next) ->
    req.fortune.voteDown (err) ->
        if err then return next err
        req.flash "info", "Fortune voted down"
        res.redirect "/fortune/#{req.fortune.slug}"

exports.index = (req, res, next) ->
    Fortune.findLatest limit: 10, (err, fortunes) ->
        if err then return next err
        res.render "index",
            title: "Home",
            fortunes: fortunes

exports.top = (req, res, next) ->
    Fortune.findTop limit: 10, (err, fortunes) ->
        if err then return next err
        res.render "index",
            title: "Top 10",
            fortunes: fortunes

exports.show = (req, res, next) ->
    res.render "show",
        fortune: req.fortune
        title: req.fortune.title

exports.up = (req, res, next) ->
    req.fortune.voteUp (err) ->
        if err then return next err
        req.flash "info", "Fortune voted up"
        res.redirect "/fortune/#{req.fortune.slug}"

exports.worst = (req, res, next) ->
    Fortune.findWorst limit: 10, (err, fortunes) ->
        if err then return next err
        res.render "index",
            title: "Flop 10",
            fortunes: fortunes
