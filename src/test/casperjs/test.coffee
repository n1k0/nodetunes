t = casper.test

casper.on 'location.changed', (url) -> t.comment url

casper.start 'http://localhost:3000', ->
    t.assertHttpStatus 200
    t.assertTitle "Home | NodeTunes", "Homepage has expected title"
    t.assertEvalEquals ->
        __utils__.findAll('article').length
    , 2, "Homepage lists expected number of fortunes"
    t.comment "create new fortune"

casper.thenClick 'li a[href="/new"]', ->
    t.assertHttpStatus 200
    t.assertTitle "Add a fortune | NodeTunes", "Add fortune page has expected title"
    @fill 'form',
        'fortune[title]':   "New one"
        'fortune[content]': """
                            <john> Plop
                            <bob> Plip
                            """
    , true
    t.comment "submitting new fortune"

casper.then ->
    t.assertHttpStatus 200
    t.assertTitle "Home | NodeTunes", "Homepage has expected title"
    t.assertEvalEquals ->
        __utils__.findAll('article').length
    , 3, "Homepage lists new expected number of fortunes"
    t.assertEvalEquals ->
        __utils__.findOne('article h2').innerText
    , "New one", "Fortune has been added"
    @click 'article h2 a'

casper.then ->
    t.assertHttpStatus 200
    t.assertTitle "New one | NodeTunes", "Fortune page has expected title"
    t.assertEvalEquals ->
        __utils__.findOne('article blockquote').innerText
    , "<john>Plop<bob>Plip\n\n"
    , "Fortune blockquote has expected contents"

casper.then ->
    t.comment "Voting up"
    t.assertEvalEquals ->
        __utils__.findOne('.fortune-actions strong').innerText.trim()
    , "0 votes", "Expected initial number of votes"
    @click '.fortune-actions a[title="Vote up this fortune"]'

casper.then ->
    t.assertEvalEquals ->
        __utils__.findOne('.fortune-actions strong').innerText.trim()
    , "1 votes", "Expected new number of votes"
    t.comment "Voting down"
    @click '.fortune-actions a[title="Vote down this fortune"]'

casper.then ->
    t.assertEvalEquals ->
        __utils__.findOne('.fortune-actions strong').innerText.trim()
    , "0 votes", "Expected new number of votes"

casper.run -> t.done()
