doctype 5
html ->
    head ->
        meta charset: "utf-8"
        title if @title then "#{@title} | NodeTunes" else "NodeTunes"
        link rel: "stylesheet", href: "http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css"
        link rel: "stylesheet", href: "/stylesheets/nodetunes.css"
    body ->
        div class: "topbar", "data-scrollspy": "scrollspy", ->
            div class: "topbar-inner", ->
                div class: "container", ->
                    a class: "brand", href:"/", -> "NodeTunes"
                    ul class: "nav", ->
                        li -> a href: "/", -> "Home"
                        li -> a href: "/add", -> "New fortune"
        div class: "container", ->
            header ->
                h1 "NodeTunes"
            messages = @get_messages
            for level of messages
                div class: "alert-message #{level}", ->
                    a class: "close", href: "#", onclick: "this.parentNode.style.display='none'", -> "×"
                    p message for message in messages[level]
            div id: "content", ->
                safe @body
            footer ->
                p "© 2012 Nicolas Perriault"
