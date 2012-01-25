if @fortune
    div class: "fortune", ->
        h2 -> a href: "/fortune/#{@fortune.slug}", -> @fortune.title
        blockquote @helpers.fortunize @fortune.content
        p "— posted #{@helpers.timeAgoInWords @fortune.date} ago"