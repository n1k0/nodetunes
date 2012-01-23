div class: "fortune", ->
    h2 -> a href: "/fortune/#{@fortune.id}", -> @fortune.title
    blockquote @fortune.content
    p "— posted on #{@fortune.date.toDateString()}"