article class: "fortune", id: "fortune_#{@fortune.id}", ->
    h2 -> a href: "/fortune/#{@fortune.slug}", -> @fortune.title
    blockquote ->
        safe @helpers.fortunize @fortune.content
        br style: "clear:both"
    aside class: "fortune-infos", ->
        p ->
            text "Posted by"
            strong -> @fortune.author
            text @helpers.timeAgoInWords(@fortune.date) + " ago •"
            span class: "fortune-actions", ->
                strong -> "#{@fortune.votes} votes"
                text "•"
                a href: "/fortune/#{@fortune.slug}/down", title: "Vote down this fortune", "-"
                text "/"
                a href: "/fortune/#{@fortune.slug}/up", title: "Vote up this fortune", "+"
