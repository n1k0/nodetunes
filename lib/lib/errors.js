(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  exports.NotFound = (function(_super) {

    __extends(_Class, _super);

    _Class.prototype.name = "NotFound";

    function _Class(message) {
      this.message = message;
      Error.call(this, this.message);
      Error.captureStackTrace(this, arguments.callee);
    }

    return _Class;

  })(Error);

}).call(this);
