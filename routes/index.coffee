Fortune = require "../models/Fortune"
Form = require("../lib/form").Form
NotFound = require("../lib/errors").NotFound

exports.index = (req, res, next) ->
    Fortune.find({}).sort("date", -1).execFind (err, fortunes) ->
        if err then return next err
        res.render "index",
            title: "Home",
            fortunes: fortunes

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

exports.show = (req, res, next) ->
    slug = req.param "fortune_slug"
    Fortune.findOneBySlug slug, (err, fortune) ->
        if err then return next err
        if not fortune
            return next new NotFound "Fortune with slug=#{slug} not found"
        res.render "show",
            fortune: fortune
            title: fortune.title
