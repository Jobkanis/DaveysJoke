module.exports = function(modules, classes, database, data, context, app) {

    app.post("/addjoke", function(req, res) {
        context.createContext(req, function(success, context) {
            var responseObject = { success: false };

            var jokeObject = req.body;

            var jokeText = jokeObject.jokeText;
            var userId = context.userId;
            var joker = context.joker;

            var result = new classes.Result()

            if (userId && context.joker == true) {
                data.addJoke(jokeText, context.userId, joker, result, function(result) {
                    result.send(res);
                })
            } else {
                result.addFail('', '') // TODO
                result.send(res);
            }

        })
    })

    app.post("/feeljoke", function(req, res) {
        context.createContext(req, function(success, context) {
            var sessionId = context.sessionId;
            var userId = context.userId;

            var jokeObject = req.body;
            var jokeId = jokeObject.jokeId;
            var feeling = jokeObject.feeling;

            responseObject = { success: false };

            var result = new classes.Result()

            if ((jokeId) && (sessionId)) {
                data.feelJoke(sessionId, userId, jokeId, feeling, result, function(result) {
                    result.send(res);
                })
            } else {
                result.addFail('', '') // TODO
                result.send(res);
            }
        })
    })

    app.post("/removejoke", function(req, res) {
        context.createContext(req, function(success, context) {
            var userId = context.userId;
            var moderator = context.moderator;

            var jokeObject = req.body;
            var jokeId = jokeObject.jokeId;

            var result = new classes.Result()

            if ((userId) && (jokeId)) {
                data.removeJoke(jokeId, userId, moderator, result, function(result) {
                    result.send(res);
                })
            } else {
                result.addFail('', '') // TODO
                result.send(res);
            }
        })
    })
};