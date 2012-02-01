fs   = require('fs')
path = require('path')

findFiles = (dir, options) ->
    options ?= excludeDirs: ['.', '..']
    options.excludeDirs ?= ['.', '..']
    options.excludeFiles ?= []
    options.matchDirs ?= null
    options.matchFiles ?= null
    files = []
    for entry in fs.readdirSync(dir)
        _entry = path.resolve "#{dir}/#{entry}"
        stats = fs.statSync _entry
        if stats.isFile(entry)
            if (!options.matchFiles or options.matchFiles.test(_entry)) and !~options.excludeFiles.indexOf(entry)
                files.push(_entry)
        else if stats.isDirectory(entry) and !~options.excludeDirs.indexOf(entry)
            files = files.concat(findFiles(_entry, options))
    files
exports.findFiles = findFiles
