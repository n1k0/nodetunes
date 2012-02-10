form action: "/new", method: "post", ->
    if @form.valid is false
        div class: "alert-message block-message error", ->
            p "Errors have been encountered; please fix the field values highlighted in red."
    fieldset ->
        legend @title
        div class: "clearfix" + (if @form.errors.title? then " error" else ""), ->
            label for: "title", -> "Title"
            input
                type:  "text"
                name:  "fortune[title]"
                id:    "title"
                placeholder: "A funny one"
                value: @form.values.title
            if @form.errors.title
                span class: "help-block", -> @form.errors.title
        div class: "clearfix" + (if @form.errors.content? then " error" else "") , ->
            label for: "content", -> "Content"
            textarea name: "fortune[content]", id: "content", placeholder: "&lt;john&gt; Booh", ->
                @form.values.content
            # span class: "help-block", ->
            #     "Paste your quote using the following format"
            if @form.errors.content
                span class: "help-block", -> @form.errors.content
        div class: "actions", ->
            button type: "submit", class: "btn primary", -> "Submit"
