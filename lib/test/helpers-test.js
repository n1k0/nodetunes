(function() {
  var ck, helpers;

  ck = require("coffeekup");

  helpers = require("../lib/helpers");

  describe('extractFortuneData', function() {
    var extractFortuneData;
    extractFortuneData = helpers.extractFortuneData;
    it("should parse a simple quote", function() {
      return (extractFortuneData("<niko> plop\n<john> plip")).should.eql([
        {
          nick: "niko",
          quote: "plop"
        }, {
          nick: "john",
          quote: "plip"
        }
      ]);
    });
    it("should keep a standard line", function() {
      return (extractFortuneData("<niko> plop\njohn enters the chan\n<john> plip")).should.eql([
        {
          nick: "niko",
          quote: "plop"
        }, {
          nick: "",
          quote: "john enters the chan"
        }, {
          nick: "john",
          quote: "plip"
        }
      ]);
    });
    return it("should parse a complex line", function() {
      return (extractFortuneData("<niko> plop said <html> is a bad tag\n<john> lol")).should.eql([
        {
          nick: "niko",
          quote: "plop said <html> is a bad tag"
        }, {
          nick: "john",
          quote: "lol"
        }
      ]);
    });
  });

  describe('fortunize', function() {
    var fortunize;
    fortunize = helpers.fortunize;
    it("should parse a simple quote", function() {
      var rendered;
      rendered = fortunize("<niko> plop <plop>");
      return rendered.should.equal(ck.render(function() {
        return dl(function() {
          dt({
            "class": "odd"
          }, function() {
            return h("<niko>");
          });
          return dd({
            "class": "odd"
          }, function() {
            return q(function() {
              return h("plop <plop>");
            });
          });
        });
      }));
    });
    return it("should parse a complex quote", function() {
      var rendered;
      rendered = fortunize("<niko> plop <plop>\njohn enters the chan <chan>\n<john> plip <plip>");
      return rendered.should.equal(ck.render(function() {
        return dl(function() {
          dt({
            "class": "odd"
          }, function() {
            return h("<niko>");
          });
          dd({
            "class": "odd"
          }, function() {
            return q(function() {
              return h("plop <plop>");
            });
          });
          dt({
            "class": "even"
          }, function() {
            return "&nbsp;";
          });
          dd({
            "class": "even"
          }, function() {
            return h("john enters the chan <chan>");
          });
          dt({
            "class": "odd"
          }, function() {
            return h("<john>");
          });
          return dd({
            "class": "odd"
          }, function() {
            return q(function() {
              return h("plip <plip>");
            });
          });
        });
      }));
    });
  });

  describe('slugify', function() {
    var slugify;
    slugify = helpers.slugify;
    it("should slugify strings", function() {
      var cases, _case, _results;
      cases = {
        "a string": "a-string",
        "Anoth€r One": "anothr-one",
        " FOO_!?BaR ": "foo-bar"
      };
      _results = [];
      for (_case in cases) {
        _results.push((slugify(_case)).should.equal(cases[_case]));
      }
      return _results;
    });
    return it("should slugify even unslugifiable stuff", function() {
      return (slugify("?;?;?")).length.should.not.equal(0);
    });
  });

  describe('timeAgoInWords', function() {
    var oneday, onehour, oneminute, onemonth, oneyear, timeAgoInWords;
    timeAgoInWords = helpers.timeAgoInWords;
    oneminute = 60000;
    onehour = 60 * oneminute;
    oneday = 24 * onehour;
    onemonth = 30 * oneday;
    oneyear = 365 * oneday;
    it("should compute time ago for one minute", function() {
      return (timeAgoInWords(0, oneminute)).should.equal("one minute");
    });
    it("should compute time ago for two minutes", function() {
      return (timeAgoInWords(0, 2 * oneminute)).should.equal("2 minutes");
    });
    it("should compute time ago for an hour", function() {
      return (timeAgoInWords(0, onehour)).should.equal("about one hour");
    });
    it("should compute time ago for two hours", function() {
      return (timeAgoInWords(0, 2 * onehour)).should.equal("about 2 hours");
    });
    it("should compute time ago for one day", function() {
      return (timeAgoInWords(0, oneday)).should.equal("about one day");
    });
    it("should compute time ago for two days", function() {
      return (timeAgoInWords(0, 2 * oneday)).should.equal("about 2 days");
    });
    it("should compute time ago for one month", function() {
      return (timeAgoInWords(0, onemonth)).should.equal("about one month");
    });
    it("should compute time ago for two months", function() {
      return (timeAgoInWords(0, 2 * onemonth)).should.equal("about 2 months");
    });
    it("should compute time ago for one year", function() {
      return (timeAgoInWords(0, oneyear)).should.equal("about one year");
    });
    it("should compute time ago for two years", function() {
      return (timeAgoInWords(0, 2 * oneyear)).should.equal("over 2 years");
    });
    return it("should compute time ago for five years", function() {
      return (timeAgoInWords(0, 5 * oneyear)).should.equal("over 5 years");
    });
  });

}).call(this);
