exports.fortunize = (value) ->
    out = ""
    i = 0
    for line in value.split '\n'
        i++
        match = /<(\w+)>\s?(.*)\n?/g.match line.trim()
        className = if i % 2 == 0 then "even" else "odd"
        if match
            for match in m
                nick = match[0]
                quote = escape match[1]
                out += "<dt class=\"#{className}\">&lt;#{nick}&gt;</dt><dd><q>#{quote}</q></dd>\n"
        else
            out += "<dt>&nbsp;</dt><dd>#{escape(line)}</dd>\n"
    "<dl>#{out}</dl>"
