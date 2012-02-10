(function() {
  var Comment, Fortune, mongoose, slugify;

  mongoose = require("mongoose");

  slugify = require("../lib/helpers").slugify;

  /* Comment model
  */

  Comment = new mongoose.Schema({
    author: {
      type: String,
      trim: true,
      required: true,
      validate: [
        function(v) {
          return v.length >= 3 && v.length <= 50;
        }, "Author name length must be comprised between 3 and 50 chars"
      ]
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    content: {
      type: String,
      trim: true,
      required: true,
      validate: [
        function(v) {
          return v.length < 500;
        }, "Contents length must be less than 500 chars"
      ]
    },
    date: {
      type: Date,
      "default": Date.now,
      index: true
    }
  });

  Comment.path('email').validate(function(v) {
    return v.length >= 3 && v.length <= 255;
  }, "length");

  Comment.path('email').validate(function(v) {
    return /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v);
  }, "regexp");

  /* Fortune model
  */

  Fortune = new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      required: true,
      validate: [
        function(v) {
          return v.length >= 3 && v.length <= 255;
        }, "Title length must be comprised between 3 and 255 chars"
      ]
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      validate: [
        function(v) {
          return v.length >= 3 && v.length <= 255;
        }, "Slug length must be comprised between 3 and 255 chars"
      ],
      index: {
        unique: true,
        sparse: true
      }
    },
    content: {
      type: String,
      trim: true,
      required: true,
      validate: [
        function(v) {
          return v.length >= 10 && v.length <= 5000;
        }, "Contents length must be comprised between 10 and 5000 chars"
      ]
    },
    votes: {
      type: Number,
      "default": 0,
      index: true
    },
    date: {
      type: Date,
      "default": Date.now,
      index: true
    },
    comments: [Comment]
  });

  Fortune.pre('validate', function(next) {
    this.slug = slugify(this.title);
    return next();
  });

  Fortune.methods.voteDown = function(callback) {
    this.votes--;
    return this.save(function() {
      return typeof callback === "function" ? callback.apply(null, arguments) : void 0;
    });
  };

  Fortune.methods.voteUp = function(callback) {
    this.votes++;
    return this.save(function() {
      return typeof callback === "function" ? callback.apply(null, arguments) : void 0;
    });
  };

  Fortune.statics.findLatest = function(options, callback) {
    var query;
    query = this.find().desc("date");
    if (options.limit) query.limit(options.limit);
    return query.execFind(function(err, fortunes) {
      return typeof callback === "function" ? callback(err, fortunes) : void 0;
    });
  };

  Fortune.statics.findOneBySlug = function(slug, callback) {
    return this.findOne({
      slug: slug
    }, callback);
  };

  Fortune.statics.findTop = function(options, callback) {
    var query;
    query = this.find().desc("votes");
    if (options.limit) query.limit(options.limit);
    return query.execFind(function(err, fortunes) {
      return typeof callback === "function" ? callback(err, fortunes) : void 0;
    });
  };

  Fortune.statics.findWorst = function(options, callback) {
    var query;
    query = this.find().asc("votes");
    if (options.limit) query.limit(options.limit);
    return query.execFind(function(err, fortunes) {
      return typeof callback === "function" ? callback(err, fortunes) : void 0;
    });
  };

  module.exports = mongoose.model('Fortune', Fortune);

}).call(this);
