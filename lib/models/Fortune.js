(function() {
  var Fortune, mongoose, slugify;

  mongoose = require("mongoose");

  slugify = require("../lib/helpers").slugify;

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
    date: {
      type: Date,
      "default": Date.now,
      index: true
    }
  });

  Fortune.pre('validate', function(next) {
    this.slug = slugify(this.title);
    return next();
  });

  Fortune.statics.findOneBySlug = function(slug, callback) {
    return this.findOne({
      slug: slug
    }, callback);
  };

  module.exports = mongoose.model('Fortune', Fortune);

}).call(this);
