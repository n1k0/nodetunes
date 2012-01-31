module.exports =
    production:
        mongo:
            uri: "mongodb://localhost/nodetunes"
    development:
        mongo:
            uri: "mongodb://localhost/nodetunes-dev"
    test:
        mongo:
            uri: "mongodb://localhost/nodetunes-test"
