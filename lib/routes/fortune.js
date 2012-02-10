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

  exports.down = function(req, res, next) {
    return req.fortune.voteDown(function(err) {
      if (err) return next(err);
      req.flash("info", "Fortune voted down");
      return res.redirect("/fortune/" + req.fortune.slug);
    });
  };

  exports.index = function(req, res, next) {
    return Fortune.findLatest({
      limit: 10
    }, function(err, fortunes) {
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
    var stdRes;
    stdRes = function(fortune, form) {
      if (form == null) {
        form = {
          errors: {},
          values: {}
        };
      }
      console.log(form);
      return res.render("show", {
        fortune: fortune,
        form: form,
        title: req.fortune.title
      });
    };
    if (req.method !== "POST") return stdRes(req.fortune);
    req.fortune.comments.push(req.body.comment);
    return req.fortune.save(function(err) {
      var error, errors, field, _ref;
      if (err) {
        errors = {};
        _ref = err.errors;
        for (field in _ref) {
          error = _ref[field];
          errors[field] = err.errors[field].type;
        }
        req.flash("warning", "Unable to save comment");
        req.fortune.comments = req.fortune.comments.slice(0, req.fortune.comments.length - 1);
        return stdRes(req.fortune, {
          errors: errors,
          values: req.body.comment
        });
      } else {
        req.flash("info", "Comment added");
        return res.redirect("/");
      }
    });
  };

  exports.up = function(req, res, next) {
    return req.fortune.voteUp(function(err) {
      if (err) return next(err);
      req.flash("info", "Fortune voted up");
      return res.redirect("/fortune/" + req.fortune.slug);
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
