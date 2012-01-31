(function() {
  var Form;

  Form = (function() {

    function Form(model, data) {
      this.model = model;
      this.bound = false;
      this.valid = void 0;
      this.values = {};
      this.errors = {};
      if (data) this.bind(data);
    }

    Form.prototype.bind = function(params) {
      var field;
      for (field in params) {
        this.values[field] = params[field];
      }
      return this.bound = true;
    };

    Form.prototype.save = function(callback) {
      var _this = this;
      if (!this.bound) throw new Error("Cannot save unbound form");
      return new this.model(this.values).save(function(err, instance) {
        var field;
        _this.valid = true;
        if (err) {
          for (field in err.errors) {
            _this.errors[field] = err.errors[field].type;
          }
          _this.valid = false;
        }
        return typeof callback === "function" ? callback(err, instance) : void 0;
      });
    };

    return Form;

  })();

  exports.Form = Form;

}).call(this);
