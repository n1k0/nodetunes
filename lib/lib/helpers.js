(function() {
  var ck, extractFortuneData, fortunize, slugify, timeAgoInWords, util;

  ck = require("coffeekup");

  util = require("util");

  extractFortuneData = function(source) {
    var data, line, match, nick, quote, _i, _len, _ref;
    data = [];
    if (!source) return data;
    _ref = source.split('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      match = /^<(.*?)>\s?(.*)\n?/.exec(line.trim());
      nick = "";
      if (match) {
        nick = match[1];
        quote = match[2];
      } else {
        quote = line;
      }
      data.push({
        nick: nick,
        quote: quote
      });
    }
    return data;
  };

  exports.extractFortuneData = extractFortuneData;

  fortunize = function(source) {
    var tpl;
    tpl = function() {
      return dl(function() {
        var className, i, line, _len, _ref, _results;
        _ref = this.lines;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          line = _ref[i];
          className = i % 2 === 0 ? "odd" : "even";
          if (line.nick !== "") {
            dt({
              "class": className
            }, function() {
              return "&lt;" + line.nick + "&gt;";
            });
            _results.push(dd({
              "class": className
            }, function() {
              return q(function() {
                return h(line.quote);
              });
            }));
          } else {
            dt({
              "class": className
            }, function() {
              return "&nbsp;";
            });
            _results.push(dd({
              "class": className
            }, function() {
              return h(line.quote);
            }));
          }
        }
        return _results;
      });
    };
    return ck.render(tpl, {
      lines: extractFortuneData(source)
    });
  };

  exports.fortunize = fortunize;

  slugify = function(text) {
    var i, rchar;
    text = text.replace(/[^\w\s-]/g, '');
    text = text.trim();
    text = text.toLowerCase();
    text = text.replace(/[_-\s ]+/g, '-');
    if (!text) {
      rchar = function() {
        return String.fromCharCode(Math.round(Math.random() * 26) + 65);
      };
      for (i = 0; i <= 8; i++) {
        text += rchar();
      }
    }
    return text.toLowerCase();
  };

  exports.slugify = slugify;

  timeAgoInWords = function(to, from) {
    var fromTime, milliseconds, minutes, toTime, words;
    if (from == null) from = new Date;
    toTime = util.isDate(to) ? to.getTime() : to;
    fromTime = util.isDate(from) ? from.getTime() : from;
    milliseconds = toTime - fromTime;
    minutes = Math.round(Math.abs(milliseconds / 60000));
    words = "";
    if (minutes === 0) {
      words = "less than a minute";
    } else if (minutes === 1) {
      words = "one minute";
    } else if (minutes < 45) {
      words = minutes + " minutes";
    } else if (minutes < 90) {
      words = "about one hour";
    } else if (minutes < 1440) {
      words = "about " + Math.round(minutes / 60) + " hours";
    } else if (minutes < 2160) {
      words = "about one day";
    } else if (minutes < 43200) {
      words = "about " + Math.round(minutes / 1440) + " days";
    } else if (minutes < 86400) {
      words = "about one month";
    } else if (minutes < 525600) {
      words = "about " + Math.round(minutes / 43200) + " months";
    } else if (minutes < 1051200) {
      words = "about one year";
    } else {
      words = "over " + Math.round(minutes / 525600) + " years";
    }
    return words;
  };

  exports.timeAgoInWords = timeAgoInWords;

}).call(this);
