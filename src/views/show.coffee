partial "_fortune", fortune: @fortune

hr

h3 "Comments"
if @fortune.comments
    for comment in @fortune.comments
        partial "_comment", comment
else
    p "There is no comment yet."

hr

h3 "Add a comment"
form action: "/fortune/#{@fortune.slug}", method: "post", ->
    div ->
        label for: "author", "Author name"
        input
            type: "text"
            name: "comment[author]"
            id: "author"
            placeholder: "John Doe"
            value: @form.values.author
        if @form.errors.author
            span class: "help-block", -> @form.errors.author
    div ->
        label for: "email", "Author email"
        input
            type: "email"
            name: "comment[email]"
            id: "email"
            placeholder: "john@doe.com"
            value: @form.values.email
        if @form.errors.email
            span class: "help-block", -> @form.errors.email
    div ->
        label for: "content", "Content"
        textarea name: "comment[content]", id: "content", id: "content", ->
            @form.values.content
        if @form.errors.content
            span class: "help-block", -> @form.errors.content
    div ->
        input type: "submit"
