(function() {
  var Fortune, config, mongoose;

  config = require("../config");

  mongoose = require("mongoose");

  Fortune = require("../models/Fortune");

  describe('Fortune', function() {
    before(function(done) {
      return mongoose.connect(config.test.mongo.uri, function() {
        return done();
      });
    });
    after(function(done) {
      return mongoose.disconnect(function() {
        return done();
      });
    });
    it("should find top quotes", function(done) {
      return Fortune.findTop({
        limit: 2
      }, function(err, fortunes) {
        if (err) done(err);
        fortunes.should.have.length(2);
        fortunes[0].votes.valueOf().should.equal(20);
        fortunes[1].votes.valueOf().should.equal(10);
        return done();
      });
    });
    it("should find top quotes and apply limits", function(done) {
      return Fortune.findTop({
        limit: 1
      }, function(err, fortunes) {
        if (err) done(err);
        fortunes.should.have.length(1);
        fortunes[0].votes.valueOf().should.equal(20);
        return done();
      });
    });
    it("should find worst quotes", function(done) {
      return Fortune.findWorst({
        limit: 2
      }, function(err, fortunes) {
        if (err) done(err);
        fortunes.should.have.length(2);
        fortunes[0].votes.valueOf().should.equal(10);
        fortunes[1].votes.valueOf().should.equal(20);
        return done();
      });
    });
    it("should find worst quotes and apply limits", function(done) {
      return Fortune.findWorst({
        limit: 1
      }, function(err, fortunes) {
        if (err) done(err);
        fortunes.should.have.length(1);
        fortunes[0].votes.valueOf().should.equal(10);
        return done();
      });
    });
    it("should find a Fortune", function(done) {
      return Fortune.findOneBySlug("first-fortune", function(err, fortune) {
        if (err) done(err);
        fortune.title.should.equal("First fortune");
        return done();
      });
    });
    it("should vote up a Fortune", function(done) {
      return Fortune.findOneBySlug("first-fortune", function(err, fortune) {
        if (err) done(err);
        fortune.votes.valueOf().should.equal(10);
        return fortune.voteUp(function(err, fortune) {
          if (err) done(err);
          fortune.votes.valueOf().should.equal(11);
          return done();
        });
      });
    });
    return it("should vote down a Fortune", function(done) {
      return Fortune.findOneBySlug("first-fortune", function(err, fortune) {
        if (err) done(err);
        fortune.votes.valueOf().should.equal(11);
        return fortune.voteDown(function(err, fortune) {
          if (err) done(err);
          fortune.votes.valueOf().should.equal(10);
          return done();
        });
      });
    });
  });

}).call(this);
