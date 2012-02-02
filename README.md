NodeTunes
=========

NodeTunes' a [node](http://www.nodejs.org/) & [express](http://expressjs.com/)
application written in [CoffeeScript](http://coffeescript.org/); it stores
fortunes (snippets of quotes, eg. IRC/IM ones). Originally inspired by the
« [Fortunes](http://fortunes.inertie.org/) » application,
by [Maurice Svay](http://svay.com/).

I'm discovering and learning both CoffeeScript and Node while coding it, so
don't expect too much reliability, but I would warmly welcome any code review
against the code :)

If you're curious enough, you might check out the:

- [Django version of this app](http://github.com/n1k0/djortunes)
- [Symfony version of this app](http://github.com/n1k0/sftunes)

Installation
------------

At the root of a fresh checkout:

    $ npm install

Usage
-----

To get a lit of all available commands:

    $ cake
    Cakefile defines the following tasks:
    cake build                # Build current project
    cake casper               # Launches casperjs test suite
    cake docs                 # Generate annotated source code with Docco
    cake funk                 # Fantastic stuff
    cake load                 # Load test fixtures
    cake test                 # Run test suite
    cake server               # Start server
    cake watch                # Recompile CoffeeScript source files when modified

So to run the server in development:

    $ cake server
