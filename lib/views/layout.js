(function() {

  doctype(5);

  html({
    "class": "djortunes"
  }, function() {
    head(function() {
      meta({
        charset: "utf-8"
      });
      title(this.title ? "" + this.title + " | NodeTunes" : "NodeTunes");
      link({
        rel: "stylesheet",
        href: "/stylesheets/nodetunes.css"
      });
      return link({
        rel: "stylesheet",
        type: "text/css",
        media: "screen",
        href: "/stylesheets/Andika-Basic-fontfacekit/stylesheet.css"
      });
    });
    return body({
      id: "djortunes"
    }, function() {
      header(function() {
        h1(function() {
          return a({
            href: "/"
          }, "Fortunes");
        });
        p(function() {
          return small("When it's funny, it's quoted™");
        });
        return nav({
          id: "menu"
        }, function() {
          return partial("_menu");
        });
      });
      return div({
        "class": "holder"
      }, function() {
        var level, messages;
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
            }, "×");
            _ref = messages[level];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              message = _ref[_i];
              _results.push(p(message));
            }
            return _results;
          });
        }
        section({
          id: "main"
        }, function() {
          return safe(this.body);
        });
        section({
          id: "misc"
        }, function() {
          return div({
            "class": "content"
          }, function() {
            h2("About");
            return p("Fortunes is a repository of quotes. You can create an account to\nadd your own, or get the source to install it on your own server.");
          });
        });
        return footer(function() {
          return p(function() {
            return small(function() {
              text("Powered by");
              a({
                href: "http://nodejs.org/"
              }, "Node.js");
              text("and");
              a({
                href: "http://expressjs.com/"
              }, "Express");
              text(", baked by");
              a({
                href: "http://akei.com/"
              }, "NiKo");
              text("and originaly inspired by");
              a({
                href: "http://fortunes.inertie.org/"
              }, "fortunes");
              text("by");
              return a({
                href: "http://svay.com/"
              }, "Maurice Svay");
            });
          });
        });
      });
    });
  });

}).call(this);
