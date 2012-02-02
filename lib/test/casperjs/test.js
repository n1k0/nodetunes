(function() {
  var t;

  t = casper.test;

  casper.on('location.changed', function(url) {
    return t.comment(url);
  });

  casper.start('http://localhost:3000', function() {
    t.assertHttpStatus(200);
    t.assertTitle("Home | NodeTunes", "Homepage has expected title");
    t.assertEvalEquals(function() {
      return __utils__.findAll('article').length;
    }, 2, "Homepage lists expected number of fortunes");
    return t.comment("create new fortune");
  });

  casper.thenClick('li a[href="/new"]', function() {
    t.assertHttpStatus(200);
    t.assertTitle("Add a fortune | NodeTunes", "Add fortune page has expected title");
    this.fill('form', {
      'fortune[title]': "New one",
      'fortune[content]': "<john> Plop\n<bob> Plip"
    }, true);
    return t.comment("submitting new fortune");
  });

  casper.then(function() {
    t.assertHttpStatus(200);
    t.assertTitle("Home | NodeTunes", "Homepage has expected title");
    t.assertEvalEquals(function() {
      return __utils__.findAll('article').length;
    }, 3, "Homepage lists new expected number of fortunes");
    t.assertEvalEquals(function() {
      return __utils__.findOne('article h2').innerText;
    }, "New one", "Fortune has been added");
    return this.click('article h2 a');
  });

  casper.then(function() {
    t.assertHttpStatus(200);
    t.assertTitle("New one | NodeTunes", "Fortune page has expected title");
    return t.assertEvalEquals(function() {
      return __utils__.findOne('article blockquote').innerText;
    }, "<john>Plop<bob>Plip\n\n", "Fortune blockquote has expected contents");
  });

  casper.then(function() {
    t.comment("Voting up");
    t.assertEvalEquals(function() {
      return __utils__.findOne('.fortune-actions strong').innerText.trim();
    }, "0 votes", "Expected initial number of votes");
    return this.click('.fortune-actions a[title="Vote up this fortune"]');
  });

  casper.then(function() {
    t.assertEvalEquals(function() {
      return __utils__.findOne('.fortune-actions strong').innerText.trim();
    }, "1 votes", "Expected new number of votes");
    t.comment("Voting down");
    return this.click('.fortune-actions a[title="Vote down this fortune"]');
  });

  casper.then(function() {
    return t.assertEvalEquals(function() {
      return __utils__.findOne('.fortune-actions strong').innerText.trim();
    }, "0 votes", "Expected new number of votes");
  });

  casper.run(function() {
    return t.done();
  });

}).call(this);
