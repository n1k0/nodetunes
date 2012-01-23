doctype 5
html ->
    head ->
        meta charset: 'utf-8'
        title "#{@title} | My Site" if @title?
        link rel: 'stylesheet', href: 'http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css'
    body ->
        div class: "container", ->
            header ->
                h1 "NodeTunes"
                ul ->
                    li -> a href: "/", -> "Home"
                    li -> a href: "/add", -> "New fortune"
            messages = @get_messages
            for level of messages
                div class: "alert-message #{level}", ->
                    a class: "close", href: "#", onclick: "this.parentNode.style.display='none'", -> "×"
                    p message for message in messages[level]

            div id: "content", ->
                @body
            footer ->
                p "© 2012 Nicolas Perriault"
