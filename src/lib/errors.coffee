exports.NotFound = class extends Error
    name = "NotFound"
    constructor: (@message) ->
        @.name = "NotFound"
        Error.call @, @message
        Error.captureStackTrace @, arguments.callee
