doctype 5
html class: "djortunes", ->
    head ->
        meta charset: "utf-8"
        title if @title then "#{@title} | NodeTunes" else "NodeTunes"
        #link rel: "stylesheet", href: "http://twitter.github.com/bootstrap/1.4.0/bootstrap.css"
        link rel: "stylesheet", href: "/stylesheets/nodetunes.css"
        link rel: "stylesheet", type: "text/css", media: "screen", href:"/stylesheets/Andika-Basic-fontfacekit/stylesheet.css"
    body id: "djortunes", ->
        header ->
            h1 -> a href: "/", "Fortunes"
            p -> small "When it's funny, it's quoted™"
            nav id:"menu", -> partial "_menu"
        div class: "holder", ->
            messages = @get_messages
            for level of messages
                div class: "alert-message #{level}", ->
                    a class: "close", href: "#", onclick: "this.parentNode.style.display='none'", "×"
                    p message for message in messages[level]
            section id: "main", ->
                safe @body
            section id: "misc", ->
                div class: "content", ->
                    h2 "About"
                    p """Fortunes is a repository of quotes. You can create an account to
                         add your own, or get the source to install it on your own server."""
            footer -> p -> small ->
                text "Powered by"
                a href: "http://nodejs.org/", "Node.js"
                text "and"
                a href: "http://expressjs.com/", "Express"
                text ", baked by"
                a href: "http://akei.com/", "NiKo"
                text "and originaly inspired by"
                a href: "http://fortunes.inertie.org/", "fortunes"
                text "by"
                a href: "http://svay.com/", "Maurice Svay"
