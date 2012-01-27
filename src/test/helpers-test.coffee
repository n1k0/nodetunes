ck = require "coffeekup"
helpers = require "../lib/helpers"

describe 'extractFortuneData', ->
    extractFortuneData = helpers.extractFortuneData
    it "should parse a simple quote", ->
        (extractFortuneData "<niko> plop\n<john> plip").should.eql [
            {nick: "niko", quote: "plop"},
            {nick: "john", quote: "plip"},
        ]
    it "should keep a standard line", ->
        (extractFortuneData "<niko> plop\njohn enters the chan\n<john> plip").should.eql [
            {nick: "niko", quote: "plop"},
            {nick: "", quote: "john enters the chan"},
            {nick: "john", quote: "plip"},
        ]
    it "should parse a complex line", ->
        (extractFortuneData "<niko> plop said <html> is a bad tag\n<john> lol").should.eql [
            {nick: "niko", quote: "plop said <html> is a bad tag"},
            {nick: "john", quote: "lol"},
        ]

describe 'fortunize', ->
    fortunize = helpers.fortunize
    it "should parse a simple quote", ->
        rendered = fortunize "<niko> plop <plop>"
        rendered.should.equal ck.render ->
            dl ->
                dt class: "odd",  -> h "<niko>"
                dd class: "odd",  -> q -> h "plop <plop>"
    it "should parse a complex quote", ->
        rendered = fortunize "<niko> plop <plop>\njohn enters the chan <chan>\n<john> plip <plip>"
        rendered.should.equal ck.render ->
            dl ->
                dt class: "odd",  -> h "<niko>"
                dd class: "odd",  -> q -> h "plop <plop>"
                dt class: "even", -> "&nbsp;"
                dd class: "even", -> h "john enters the chan <chan>"
                dt class: "odd",  -> h "<john>"
                dd class: "odd",  -> q -> h "plip <plip>"

describe 'slugify', ->
    slugify = helpers.slugify
    it "should slugify strings", ->
        cases =
            "a string":    "a-string"
            "Anoth€r One": "anothr-one"
            " FOO_!?BaR ": "foo-bar"
        for _case of cases
            (slugify _case).should.equal cases[_case]
    it "should slugify even unslugifiable stuff", ->
        (slugify "?;?;?").length.should.not.equal 0

describe 'timeAgoInWords', ->
    timeAgoInWords = helpers.timeAgoInWords
    oneminute = 60000
    onehour   = 60 * oneminute
    oneday    = 24 * onehour
    onemonth  = 30 * oneday
    oneyear   = 365 * oneday
    it "should compute time ago for one minute", ->
        (timeAgoInWords 0, oneminute).should.equal "one minute"
    it "should compute time ago for two minutes", ->
        (timeAgoInWords 0, 2 * oneminute).should.equal "2 minutes"
    it "should compute time ago for an hour", ->
        (timeAgoInWords 0, onehour).should.equal "about one hour"
    it "should compute time ago for two hours", ->
        (timeAgoInWords 0, 2 * onehour).should.equal "about 2 hours"
    it "should compute time ago for one day", ->
        (timeAgoInWords 0, oneday).should.equal "about one day"
    it "should compute time ago for two days", ->
        (timeAgoInWords 0, 2 * oneday).should.equal "about 2 days"
    it "should compute time ago for one month", ->
        (timeAgoInWords 0, onemonth).should.equal "about one month"
    it "should compute time ago for two months", ->
        (timeAgoInWords 0, 2 * onemonth).should.equal "about 2 months"
    it "should compute time ago for one year", ->
        (timeAgoInWords 0, oneyear).should.equal "about one year"
    it "should compute time ago for two years", ->
        (timeAgoInWords 0, 2 * oneyear).should.equal "over 2 years"
    it "should compute time ago for five years", ->
        (timeAgoInWords 0, 5 * oneyear).should.equal "over 5 years"
