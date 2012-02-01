(function() {
  var Form, Fortune, NotFound;

  Fortune = require("../models/Fortune");

  Form = require("../lib/form").Form;

  NotFound = require("../lib/errors").NotFound;

  exports.add = function(req, res) {
    var form, stdRes;
    form = new Form(Fortune);
    stdRes = function(form) {
      return res.render("add", {
        form: form,
        title: "Add a fortune"
      });
    };
    if (req.method !== "POST") return stdRes(form);
    form.bind(req.body.fortune);
    return form.save(function(err) {
      if (err) {
        req.flash("warning", "Unable to save fortune");
        return stdRes(form);
      } else {
        req.flash("info", "Fortune added");
        return res.redirect("/");
      }
    });
  };

  exports.index = function(req, res, next) {
    return Fortune.find({}).sort("date", -1).limit(10).execFind(function(err, fortunes) {
      if (err) return next(err);
      return res.render("index", {
        title: "Home",
        fortunes: fortunes
      });
    });
  };

  exports.top = function(req, res, next) {
    return Fortune.findTop({
      limit: 10
    }, function(err, fortunes) {
      if (err) return next(err);
      return res.render("index", {
        title: "Top 10",
        fortunes: fortunes
      });
    });
  };

  exports.show = function(req, res, next) {
    var slug;
    slug = req.param("fortune_slug");
    return Fortune.findOneBySlug(slug, function(err, fortune) {
      if (err) return next(err);
      if (!fortune) {
        return next(new NotFound("Fortune with slug=" + slug + " not found"));
      }
      return res.render("show", {
        fortune: fortune,
        title: fortune.title
      });
    });
  };

  exports.worst = function(req, res, next) {
    return Fortune.findWorst({
      limit: 10
    }, function(err, fortunes) {
      if (err) return next(err);
      return res.render("index", {
        title: "Flop 10",
        fortunes: fortunes
      });
    });
  };

}).call(this);
