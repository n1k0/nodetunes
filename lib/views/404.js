(function() {

  h2("Not found, dude.");

  p("The resource you requested could not be found.");

  if (this.err) {
    h3("Technical details");
    blockquote(this.err.message);
  }

}).call(this);
