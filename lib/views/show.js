(function() {
  var comment, _i, _len, _ref;

  partial("_fortune", {
    fortune: this.fortune
  });

  hr;

  h3("Comments");

  if (this.fortune.comments) {
    _ref = this.fortune.comments;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      comment = _ref[_i];
      partial("_comment", comment);
    }
  } else {
    p("There is no comment yet.");
  }

  hr;

  h3("Add a comment");

  form({
    action: "/fortune/" + this.fortune.slug,
    method: "post"
  }, function() {
    div(function() {
      label({
        "for": "author"
      }, "Author name");
      input({
        type: "text",
        name: "comment[author]",
        id: "author",
        placeholder: "John Doe",
        value: this.form.values.author
      });
      if (this.form.errors.author) {
        return span({
          "class": "help-block"
        }, function() {
          return this.form.errors.author;
        });
      }
    });
    div(function() {
      label({
        "for": "email"
      }, "Author email");
      input({
        type: "email",
        name: "comment[email]",
        id: "email",
        placeholder: "john@doe.com",
        value: this.form.values.email
      });
      if (this.form.errors.email) {
        return span({
          "class": "help-block"
        }, function() {
          return this.form.errors.email;
        });
      }
    });
    div(function() {
      label({
        "for": "content"
      }, "Content");
      textarea({
        name: "comment[content]",
        id: "content",
        id: "content"
      }, function() {
        return this.form.values.content;
      });
      if (this.form.errors.content) {
        return span({
          "class": "help-block"
        }, function() {
          return this.form.errors.content;
        });
      }
    });
    return div(function() {
      return input({
        type: "submit"
      });
    });
  });

}).call(this);
