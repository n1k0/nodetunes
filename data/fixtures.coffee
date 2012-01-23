mongoose = require "mongoose"
mongoose.connect 'mongodb://localhost/nodetunes-dev'

Fortune = require "../models/Fortune"

fixtures = [{
    title: "First fortune",
    content: """
             <niko> Hello!
             <dave> Hello.
             """,
    date: new Date()
}, {
    title: "Second fortune",
    content: """
             <bob> I'm so happy this works
             <joe> Me neither actually.
             """,
    date: new Date()
}]

Fortune.remove ->
    processed = 0
    for fixture in fixtures
        new Fortune(fixture).save (err, f) ->
            if err
                console.error "Errors encountered"
                for error of err.errors
                    console.error "- #{error}: #{err.errors[error].type}"
            else
                console.log "Fixture saved: '#{f.title}'"
            if ++processed == fixtures.length
                console.log "Processed #{fixtures.length} fixtures."
                process.exit()
