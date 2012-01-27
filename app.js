require("coffee-script");

var app = require("./lib")
  , port = process.env.PORT || process.env.C9_PORT || 3000;

app.listen(port);

console.log("Server listening on port %s in %s mode", port, app.settings.env);
