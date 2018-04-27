module.exports = function(modules, classes, configurations, database) {

    var getJokes = function(sessionId, userId, result, done) {
        var jokes = [];

        database.getJokeFields(sessionId, userId, result, function(result) {
            if (result.successfull) {
                var jokes = [];
                var fields = result.GRAPResult('fields');
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i]) {
                        var joke = new classes.Joke(fields[i].idjoke, fields[i].joketext, fields[i].creator, fields[i].personalFeeling, fields[i].userLoves, fields[i].userHates, fields[i].sessionLoves, fields[i].sessionHates); //creatorid shareable?!
                        jokes.push(joke);
                    }
                }
                result.addResult('jokes', jokes)
                done(result)
            } else {
                result.addFail('', ''); //TODO
                done(result);
            }
        })
    };

    var addJoke = function(jokeText, creator, joker, result, done) {
        database.addJoke(jokeText, creator, joker, result, function(result) {
            done(result);
        })
    }

    var feelJoke = function(sessionId, userId, jokeId, feeling, result, done) {
        database.addFeeling(sessionId, userId, jokeId, feeling, result, function(result) {
            done(result);
        })
    }

    var removeJoke = function(jokeId, userId, moderator, result, done) {
        database.removeJoke(jokeId, userId, moderator, result, function(result) {
            done(result);
        })
    }

    return {
        getJokes: getJokes,
        addJoke: addJoke,
        feelJoke: feelJoke,
        removeJoke: removeJoke
    }

}