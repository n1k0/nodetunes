form action: "/add", method: "post", ->
    if Object.keys(@form.errors).length
        div class: "alert-message block-message error", ->
            p "Errors have been encountered"
    fieldset ->
        div class: "clearfix" + (if @form.errors.title? then " error" else ""), ->
            label for: "title", -> "Title"
            div class: "input", ->
                input type: "text", name: "fortune[title]", id: "title", value: @form.values.title
                p @form.errors.title if @form.errors.title?
        div class: "clearfix" + (if @form.errors.content? then " error" else "") , ->
            label for: "content", -> "Content"
            div class: "input", ->
                textarea name: "fortune[content]", id: "content", ->
                    @form.values.content
                p @form.errors.content if @form.errors.content?
        div class: "clearfix", ->
            button type: "submit", class: "btn primary", -> "Submit"
