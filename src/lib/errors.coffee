exports.NotFound = class extends Error
    name: "NotFound"
    constructor: (@message) ->
        Error.call @, @message
        Error.captureStackTrace @, arguments.callee
