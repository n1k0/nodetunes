ul ->
    cls = if @url == "/" then "active" else ""
    li class: cls, ->
        a href: "/", ->
            span "Latest"
            small "Recently added quotes"
    cls = if @url == "/top" then "active" else ""
    li class: cls, ->
        a href: "/top", ->
            span "Top"
            small "Top rated quotes"
    cls = if @url == "/worst" then "active" else ""
    li class: cls, ->
        a href: "/worst", ->
            span "Worst"
            small "Badly rated quotes"
    cls = if @url == "/new" then "active" else ""
    li class: cls, ->
        a href: "/new", ->
            span "Add"
            small "Add your own quote"