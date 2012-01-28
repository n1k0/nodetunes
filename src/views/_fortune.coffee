if @fortune
    article class: "fortune", ->
        h2 -> a href: "/fortune/#{@fortune.slug}", -> @fortune.title
        blockquote -> safe @helpers.fortunize @fortune.content
        p "— posted #{@helpers.timeAgoInWords @fortune.date} ago"