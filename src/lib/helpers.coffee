ck   = require "coffeekup"
util = require "util"

# Extracts a fortune data structure from a source text.
extractFortuneData = (source) ->
    data = []
    if not source
        return data
    for line in source.split '\n'
        match = /^<(.*?)>\s?(.*)\n?/.exec line.trim()
        nick = ""
        if match
            nick =  match[1]
            quote = match[2]
        else
            quote = line
        data.push
            nick: nick
            quote: quote
    data
exports.extractFortuneData = extractFortuneData

# Renders a fortune source text to formatted HTML.
fortunize = (source) ->
    tpl = ->
        dl ->
            for line, i in @lines
                className = if i % 2 == 0 then "odd" else "even"
                if line.nick != ""
                    dt class: className, -> "&lt;#{line.nick}&gt;"
                    dd class: className, -> q -> line.quote
                else
                    dt class: className, -> "&nbsp;"
                    dd class: className, -> line.quote
    ck.render(tpl, lines: extractFortuneData(source))
exports.fortunize = fortunize

# Generates a slug from a source text. In case no text could be generated, a
# random string is generated.
slugify = (text) ->
    text = text.replace /[^\w\s-]/g, ''
    text = text.trim()
    text = text.toLowerCase()
    text = text.replace /[_-\s ]+/g, '-'
    if not text
        rchar = -> String.fromCharCode(Math.round(Math.random() * 26) + 65)
        text += rchar() for i in [0..8]
    text.toLowerCase()
exports.slugify = slugify

# Formats a human readable distance of time between two dates.
timeAgoInWords = (to, from) ->
    from ?= new Date
    toTime = if util.isDate to then to.getTime() else to
    fromTime = if util.isDate from then from.getTime() else from
    milliseconds = toTime - fromTime
    minutes = Math.round(Math.abs(milliseconds / 60000))
    words = ""
    if minutes is 0
        words = "less than a minute"
    else if minutes is 1
        words = "one minute"
    else if minutes < 45
        words = minutes + " minutes"
    else if minutes < 90
        words = "about one hour"
    else if minutes < 1440
        words = "about " + Math.round(minutes / 60) + " hours"
    else if minutes < 2160
        words = "about one day"
    else if minutes < 43200
        words = "about " + Math.round(minutes / 1440) + " days"
    else if minutes < 86400
        words = "about one month"
    else if minutes < 525600
        words = "about " + Math.round(minutes / 43200) + " months"
    else if minutes < 1051200
        words = "about one year"
    else
        words = "over " + Math.round(minutes / 525600) + " years"
    words
exports.timeAgoInWords = timeAgoInWords
