(function() {
  var findFiles, fs, path;

  fs = require('fs');

  path = require('path');

  findFiles = function(dir, options) {
    var entry, files, stats, _entry, _i, _len, _ref;
    if (options == null) {
      options = {
        excludeDirs: ['.', '..']
      };
    }
    if (options.excludeDirs == null) options.excludeDirs = ['.', '..'];
    if (options.excludeFiles == null) options.excludeFiles = [];
    if (options.matchDirs == null) options.matchDirs = null;
    if (options.matchFiles == null) options.matchFiles = null;
    files = [];
    _ref = fs.readdirSync(dir);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      entry = _ref[_i];
      _entry = path.resolve("" + dir + "/" + entry);
      stats = fs.statSync(_entry);
      if (stats.isFile(entry)) {
        if ((!options.matchFiles || options.matchFiles.test(_entry)) && !~options.excludeFiles.indexOf(entry)) {
          files.push(_entry);
        }
      } else if (stats.isDirectory(entry) && !~options.excludeDirs.indexOf(entry)) {
        files = files.concat(findFiles(_entry, options));
      }
    }
    return files;
  };

  exports.findFiles = findFiles;

}).call(this);
