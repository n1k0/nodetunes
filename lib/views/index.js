(function() {
  var fortune, _i, _len, _ref;

  if (this.fortunes.length) {
    p("" + this.fortunes.length + " fortunes");
    _ref = this.fortunes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      fortune = _ref[_i];
      partial('_fortune', {
        fortune: fortune
      });
      hr;
    }
  } else {
    p("No fortune");
  }

}).call(this);
