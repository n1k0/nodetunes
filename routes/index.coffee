Fortune = require "../models/Fortune"
Form = require("../forms/Form").Form
NotFound = require("../lib/errors").NotFound

exports.index = (req, res) ->
    Fortune.find({}).sort("date", -1).execFind (err, fortunes) ->
        if err
            throw new NotFound "Fortunes not found"
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

exports.show = (req, res) ->
    id = req.param('fortuneId')
    Fortune.findById id, (err, fortune) ->
        if err
            throw new NotFound "Fortune with id=#{id} not found"
        res.render "show",
            fortune: fortune
            title: fortune.title
