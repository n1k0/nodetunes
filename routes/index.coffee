Fortune = require "../models/Fortune"
Form = require("../forms/Form").Form

exports.index = (req, res) ->
    Fortune.find {}, (err, fortunes) ->
        res.render "index",
            title: "NodeTunes",
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
            req.flash "error", "Unable to save fortune"
            stdRes form
        else
            req.flash "info", "Fortune added"
            res.redirect "/"

exports.show = (req, res) ->
    Fortune.findById req.param('fortuneId'), (err, fortune) ->
        res.render "show",
            fortune: fortune
            fortunize: require("../lib/helpers").fortunize
            title: fortune.title
