(function() {

  form({
    action: "/new",
    method: "post"
  }, function() {
    if (this.form.valid === false) {
      div({
        "class": "alert-message block-message error"
      }, function() {
        return p("Errors have been encountered; please fix the field values highlighted in red.");
      });
    }
    return fieldset(function() {
      legend(this.title);
      div({
        "class": "clearfix" + (this.form.errors.title != null ? " error" : "")
      }, function() {
        label({
          "for": "title"
        }, function() {
          return "Title";
        });
        return div({
          "class": "input"
        }, function() {
          input({
            type: "text",
            "class": "xlarge",
            name: "fortune[title]",
            id: "title",
            placeholder: "A funny one",
            value: this.form.values.title
          });
          if (this.form.errors.title) {
            return span({
              "class": "help-block"
            }, function() {
              return this.form.errors.title;
            });
          }
        });
      });
      div({
        "class": "clearfix" + (this.form.errors.content != null ? " error" : "")
      }, function() {
        label({
          "for": "content"
        }, function() {
          return "Content";
        });
        return div({
          "class": "input"
        }, function() {
          textarea({
            "class": "xxlarge",
            name: "fortune[content]",
            id: "content",
            placeholder: "&lt;john&gt; Booh"
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
      });
      return div({
        "class": "actions"
      }, function() {
        return button({
          type: "submit",
          "class": "btn primary"
        }, function() {
          return "Submit";
        });
      });
    });
  });

}).call(this);
