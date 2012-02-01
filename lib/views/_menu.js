(function() {

  ul(function() {
    var cls;
    cls = this.url === "/" ? "active" : "";
    li({
      "class": cls
    }, function() {
      return a({
        href: "/"
      }, function() {
        span("Latest");
        return small("Recently added quotes");
      });
    });
    cls = this.url === "/top" ? "active" : "";
    li({
      "class": cls
    }, function() {
      return a({
        href: "/top"
      }, function() {
        span("Top");
        return small("Top rated quotes");
      });
    });
    cls = this.url === "/worst" ? "active" : "";
    li({
      "class": cls
    }, function() {
      return a({
        href: "/worst"
      }, function() {
        span("Worst");
        return small("Badly rated quotes");
      });
    });
    cls = this.url === "/new" ? "active" : "";
    return li({
      "class": cls
    }, function() {
      return a({
        href: "/new"
      }, function() {
        span("Add");
        return small("Add your own quote");
      });
    });
  });

}).call(this);
