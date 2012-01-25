class Form
    constructor: (model, data) ->
        @model = model
        @bound = false
        @valid = undefined
        @values = {}
        @errors = {}
        if data
            @bind data

    bind: (params) ->
        for field of params
            @values[field] = params[field]
        @bound = true

    save: (callback) ->
        if not @bound
            throw new Error "Cannot save unbound form"
        new @model(@values).save (err, instance) =>
            @valid = true
            if err
                for field of err.errors
                    @errors[field] = err.errors[field].type
                @valid = false
            if typeof callback == "function"
                callback err, instance

exports.Form = Form
