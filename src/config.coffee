module.exports =
    production:
        mongo:
            uri: "mongodb://127.0.0.1/nodetunes"
    development:
        mongo:
            uri: "mongodb://127.0.0.1/nodetunes-dev"
    test:
        mongo:
            uri: "mongodb://127.0.0.1/nodetunes-test"
