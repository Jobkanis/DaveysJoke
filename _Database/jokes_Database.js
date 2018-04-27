module.exports = function(modules, classes, configurations, connection) {

    var getJokeFields = function(sessionId, userId, result, done) {
        var queryString =
            '        select ' +
            '        joke.*, ' +
            '        coalesce(usl.userloves, 0) AS userLoves, ' +
            '        coalesce(ush.userhates, 0) AS userHates, ' +
            '        coalesce(fsl.sessionloves, 0) AS sessionLoves, ' +
            '        coalesce(fsh.sessionhates, 0) AS sessionHates,' +
            '        coalesce(puf.feeling, coalesce(psf.feeling), null) AS personalFeeling' +
            '            FROM joke ' +
            '                LEFT JOIN' +
            '                    (SELECT us.jokeid, count(*) AS userloves FROM userfeelings AS us WHERE us.feeling = 1 GROUP BY us.jokeid) AS usl ON joke.idjoke = usl.jokeid' +
            '                LEFT JOIN' +
            '                    (SELECT fs.joke, count(*) AS sessionloves FROM feelings  AS fs WHERE fs.feeling = 1 GROUP BY fs.joke) AS fsl ON joke.idjoke = fsl.joke' +
            '                LEFT JOIN' +
            '                    (SELECT us.jokeid, count(*) AS userhates FROM userfeelings AS us WHERE us.feeling = 0 GROUP BY us.jokeid) AS ush ON joke.idjoke = ush.jokeid' +
            '                LEFT JOIN' +
            '                    (SELECT fs.joke, count(*) AS sessionhates FROM feelings  AS fs WHERE fs.feeling = 0 GROUP BY fs.joke) AS fsh ON joke.idjoke = fsh.joke' +
            '                LEFT JOIN' +
            '                    (SELECT jokeid, feeling FROM userfeelings WHERE userid = ?) as puf ON puf.jokeid = joke.idjoke' +
            '                LEFT JOIN' +
            '                    (SELECT joke, feeling FROM feelings WHERE session = ?) as psf ON psf.joke = joke.idjoke' +
            '                ORDER BY joke.idjoke DESC;';

        var queryArray = [-1, -1];

        if (userId) {
            var queryArray = [userId, -1];
        } else {
            var queryArray = [-1, sessionId];
        }
        connection.query(queryString, queryArray, function(err, results) {
            if (!err) {
                result.addResult('fields', results)
                done(result);
            } else {
                if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                    console.log(err);
                }
                result.addFail('', ''); //TODO
                done(result);
            }
        })
    }

    var addJoke = function(jokeText, creator, joker, result, done) {
        //TODO: add joker check
        var queryString = 'INSERT INTO joke(joketext, creator) VALUES(?, ?);';
        var queryArray = [jokeText, creator];
        connection.query(queryString, queryArray, function(err, results) {
            if (!err) {
                var jokeId = results.insertId;
                result.addResult('jokeId', jokeId)
                done(result);
            } else {
                if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                    console.log(err);
                }
                result.addFail('', ''); //TODO
                done(result);
            }
        })

    }

    var removeJoke = function(jokeId, userId, moderator, result, done) {
        //TODO: moderator check
        var queryString = 'DELETE FROM joke WHERE idjoke = ? AND creator = ?;';
        var queryArray = [jokeId, userId];
        connection.query(queryString, queryArray, function(err, results) {
            if (!err) {
                if (results.affectedRows == 1) {
                    result.addSuccess();
                    done(result);
                } else {
                    result.addFail('', ''); //TODO
                    done(result);
                }
            } else {
                if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                    console.log(err);
                }
                result.addFail('', ''); //TODO
                done(result);
            }
        })
    }

    var addFeeling = function(sessionId, userId, jokeId, feeling, result, done) {
        if (userId) {
            var queryStringINSERT = 'INSERT INTO userfeelings(userid, jokeid, feeling) VALUES(?, ?, ?)';

            if (feeling == '') {
                var queryStringINSERT = 'INSERT INTO userfeelings(userid, jokeid) VALUES(?, ?)';
                var queryArrayINSERT = [userId, jokeId];
            } else {
                var queryStringINSERT = 'INSERT INTO userfeelings(userid, jokeid, feeling) VALUES(?, ?, ?)';
                var queryArrayINSERT = [userId, jokeId, feeling];
            }


            connection.query(queryStringINSERT, queryArrayINSERT, function(err1, results) {
                if (!err1) {
                    //console.log("Inserted into userfeelings: " + sessionId + "," + jokeId + "," + feeling);
                    result.addSuccess();
                    done(result);
                } else {
                    if (feeling == '') {
                        var queryStringUPDATE = "UPDATE userfeelings SET feeling = NULL WHERE userid = ? AND jokeid = ?"
                        var queryArrayUPDATE = [userId, jokeId];
                    } else {
                        var queryStringUPDATE = "UPDATE userfeelings SET feeling = ? WHERE userid = ? AND jokeid = ?"
                        var queryArrayUPDATE = [feeling, userId, jokeId];
                    }

                    connection.query(queryStringUPDATE, queryArrayUPDATE, function(err2, results) {
                        if (!err2) {
                            //console.log("Updated userfeeling: " + userId + "," + jokeId + "," + feeling);
                            result.addSuccess();
                            done(result);
                        } else {
                            if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                                console.log("Error 1.1: " + err1);
                                console.log("Error 1.2: " + err2);
                            }
                            result.addFail('', ''); //TODO
                            done(result);
                        }
                    })
                }
            })
        } else {
            if (feeling == '') {
                var queryStringINSERT = 'INSERT INTO feelings(session, joke) VALUES(?, ?)';
                var queryArrayINSERT = [sessionId, jokeId];
            } else {
                var queryArrayINSERT = [sessionId, jokeId, feeling];
                var queryStringINSERT = 'INSERT INTO feelings(session, joke, feeling) VALUES(?, ?, ?)';
            }
            connection.query(queryStringINSERT, queryArrayINSERT, function(err1, results) {
                if (!err1) {
                    //console.log("Inserted into feelings: " + sessionId + "," + jokeId + "," + feeling);
                    result.addSuccess();
                    done(result);
                } else {
                    if (feeling == '') {
                        var queryStringUPDATE = "UPDATE feelings SET feeling = NULL WHERE session = ? AND joke = ?"
                        var queryArrayUPDATE = [sessionId, jokeId];
                    } else {
                        var queryStringUPDATE = "UPDATE feelings SET feeling = ? WHERE session = ? AND joke = ?"
                        var queryArrayUPDATE = [feeling, sessionId, jokeId];
                    }

                    connection.query(queryStringUPDATE, queryArrayUPDATE, function(err2, results) {
                        if (!err2) {
                            //console.log("Updated feeling: " + sessionId + "," + jokeId + "," + feeling);
                            result.addSuccess();
                            done(result);
                        } else {
                            if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                                console.log("Error 2.1: " + err1);
                                console.log("Error 2.2: " + err2);
                            }
                            result.addFail('', ''); //TODO
                            done(result);
                        }
                    })
                }
            })
        }
    }

    return {
        getJokeFields: getJokeFields,
        addJoke: addJoke,
        removeJoke: removeJoke,
        addFeeling: addFeeling
    }
}