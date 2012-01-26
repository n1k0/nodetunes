(function() {

  doctype(5);

  html(function() {
    head(function() {
      meta({
        charset: "utf-8"
      });
      title(this.title ? "" + this.title + " | NodeTunes" : "NodeTunes");
      link({
        rel: "stylesheet",
        href: "http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css"
      });
      return link({
        rel: "stylesheet",
        href: "/stylesheets/nodetunes.css"
      });
    });
    return body(function() {
      div({
        "class": "topbar",
        "data-scrollspy": "scrollspy"
      }, function() {
        return div({
          "class": "topbar-inner"
        }, function() {
          return div({
            "class": "container"
          }, function() {
            a({
              "class": "brand",
              href: "/"
            }, function() {
              return "NodeTunes";
            });
            return ul({
              "class": "nav"
            }, function() {
              li(function() {
                return a({
                  href: "/"
                }, function() {
                  return "Home";
                });
              });
              return li(function() {
                return a({
                  href: "/add"
                }, function() {
                  return "New fortune";
                });
              });
            });
          });
        });
      });
      return div({
        "class": "container"
      }, function() {
        var level, messages;
        header(function() {
          return h1("NodeTunes");
        });
        messages = this.get_messages;
        for (level in messages) {
          div({
            "class": "alert-message " + level
          }, function() {
            var message, _i, _len, _ref, _results;
            a({
              "class": "close",
              href: "#",
              onclick: "this.parentNode.style.display='none'"
            }, function() {
              return "×";
            });
            _ref = messages[level];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              message = _ref[_i];
              _results.push(p(message));
            }
            return _results;
          });
        }
        div({
          id: "content"
        }, function() {
          return safe(this.body);
        });
        return footer(function() {
          return p("© 2012 Nicolas Perriault");
        });
      });
    });
  });

}).call(this);
