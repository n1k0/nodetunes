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
        text("Posted by");
        strong(function() {
          return this.fortune.author;
        });
        text(this.helpers.timeAgoInWords(this.fortune.date) + " ago •");
        return span({
          "class": "fortune-actions"
        }, function() {
          strong(function() {
            return "" + this.fortune.votes + " votes";
          });
          text("•");
          a({
            href: "/fortune/" + this.fortune.slug + "/down",
            title: "Vote down this fortune"
          }, "-");
          text("/");
          return a({
            href: "/fortune/" + this.fortune.slug + "/up",
            title: "Vote up this fortune"
          }, "+");
        });
      });
    });
  });

}).call(this);
