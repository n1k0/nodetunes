(function() {

  if (this.fortune) {
    div({
      "class": "fortune"
    }, function() {
      h2(function() {
        return a({
          href: "/fortune/" + this.fortune.slug
        }, function() {
          return this.fortune.title;
        });
      });
      blockquote(this.helpers.fortunize(this.fortune.content));
      return p("— posted " + (this.helpers.timeAgoInWords(this.fortune.date)) + " ago");
    });
  }

}).call(this);
