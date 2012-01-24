class NotFound extends Error
    constructor: (@path) ->
        @.name = "NotFound"
        if path
            Error.call @, "Cannot find #{path}"
            @.path = path
        else
            Error.call @, "Not Found"
        Error.captureStackTrace @, arguments.callee

exports.NotFound = NotFound
