module.exports = function(modules, classes, configurations, connection) {

    var createSession = function(userid, result, done) {
        if (userid) {
            var queryString = 'INSERT session(iduser) VALUES(?)';
            var queryArray = [userid];
            connection.query(queryString, queryArray, function(err, results) {
                if (!err) {
                    result.addResult('sessionId', results.insertId);
                    done(result);
                } else if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                    results.addFail(configurations.login.__subject, configurations.login.sessionCreationFail);
                    done(result);
                }
            })
        } else {
            var queryString = 'INSERT session() VALUES();'
            var queryArray = [];
            connection.query(queryString, queryArray, function(err, results) {
                if (!err) {
                    result.addResult('sessionId', results.insertId);
                    done(result);
                } else {
                    if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                        console.log(err);
                    }
                    result.addFail(configurations.messages.session.__subject, configurations.messages.session.error);
                    done(result);
                }
            })
        }
    }


    var updateSessions = function() {
        var queryString = "UPDATE session SET avaible = 0 WHERE expires < now() AND idsession > 0";
        var queryArray = [];
        connection.query(queryString, queryArray, function(err, results) {
            if (err) {
                if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                    console.log(err);
                }
            }
        })
    }



    var checkSessionStillAvaible = function(sessionId, result, done) {
        var queryString = "SELECT session.*, user.username, user.created, user.davey, user.moderator, user.joker from session" +
            " LEFT JOIN user on session.iduser = user.iduser" +
            " WHERE idsession = ? AND avaible = 1 ";
        var queryArray = [sessionId];
        connection.query(queryString, queryArray, function(err, results) {
            if (!err) {
                if (results[0]) {
                    var fields = results[0];

                    var userId = fields.iduser;

                    var username = fields.username;
                    var created = fields.created;
                    var davey = fields.davey;
                    var moderator = fields.moderator;
                    var joker = fields.joker
                    result.addSuccess();
                    done(result, userId, username, created, davey, moderator, joker);

                } else {
                    result.addFail(configurations.messages.session.__subject, configurations.messages.session.userNotFound);
                    done(result);
                }
            } else {
                if (enableErrorMessages) {
                    console.log(err);
                }
                result.addFail(configurations.messages.session.__subject, configurations.messages.session.userNotFound);
                done(result);
            }
        })
    }
    return {
        createSession: createSession,
        updateSessions: updateSessions,
        checkSessionStillAvaible: checkSessionStillAvaible
    }
}