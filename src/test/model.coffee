config = require "../config"
mongoose = require "mongoose"
Fortune = require "../models/Fortune"

describe 'Fortune', ->
    before (done) ->
        mongoose.connect config.test.mongo.uri, -> done()

    after (done) ->
        mongoose.disconnect -> done()

    it "should find top quotes", (done) ->
        Fortune.findTop limit: 2, (err, fortunes) ->
            done(err) if err
            fortunes.should.have.length 2
            fortunes[0].votes.valueOf().should.equal 20
            fortunes[1].votes.valueOf().should.equal 10
            done()

    it "should find top quotes and apply limits", (done) ->
        Fortune.findTop limit: 1, (err, fortunes) ->
            done(err) if err
            fortunes.should.have.length 1
            fortunes[0].votes.valueOf().should.equal 20
            done()

    it "should find worst quotes", (done) ->
        Fortune.findWorst limit: 2, (err, fortunes) ->
            done(err) if err
            fortunes.should.have.length 2
            fortunes[0].votes.valueOf().should.equal 10
            fortunes[1].votes.valueOf().should.equal 20
            done()

    it "should find worst quotes and apply limits", (done) ->
        Fortune.findWorst limit: 1, (err, fortunes) ->
            done(err) if err
            fortunes.should.have.length 1
            fortunes[0].votes.valueOf().should.equal 10
            done()

    it "should find a Fortune", (done) ->
        Fortune.findOneBySlug "first-fortune", (err, fortune) ->
            done(err) if err
            fortune.title.should.equal "First fortune"
            done()

    it "should vote up a Fortune", (done) ->
        Fortune.findOneBySlug "first-fortune", (err, fortune) ->
            done(err) if err
            fortune.votes.valueOf().should.equal 10
            fortune.voteUp (err, fortune) ->
                done(err) if err
                fortune.votes.valueOf().should.equal 11
                done()

    it "should vote down a Fortune", (done) ->
        Fortune.findOneBySlug "first-fortune", (err, fortune) ->
            done(err) if err
            fortune.votes.valueOf().should.equal 11
            fortune.voteDown (err, fortune) ->
                done(err) if err
                fortune.votes.valueOf().should.equal 10
                done()
