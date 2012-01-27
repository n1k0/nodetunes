var t = casper.test;

casper.start('http://localhost:3000', function() {
    t.assertTitle("Home | NodeTunes", "Homepage has expected title");
});

casper.run(function() {
    t.done();
});