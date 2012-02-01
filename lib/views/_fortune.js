(function() {

  article({
    "class": "fortune",
    id: "fortune_" + this.fortune.id
  }, function() {
    h2(function() {
      return a({
        href: "/fortune/" + this.fortune.slug
      }, function() {
        return this.fortune.title;
      });
    });
    blockquote(function() {
      safe(this.helpers.fortunize(this.fortune.content));
      return br({
        style: "clear:both"
      });
    });
    return aside({
      "class": "fortune-infos"
    }, function() {
      return p(function() {
        safe("Posted by " + (yield(function() {
          return strong(function() {
            return h(this.fortune.author);
          });
        })) + " " + (this.helpers.timeAgoInWords(this.fortune.date)) + " ago.");
        return span({
          "class": "fortune-actions"
        }, function() {
          return strong(function() {
            return "" + this.fortune.votes + " votes";
          });
        });
      });
    });
  });

}).call(this);
