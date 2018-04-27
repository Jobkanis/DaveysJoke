module.exports = function(modules, classes, configurations, connection) {

    var registerUser = function(username, password, result, done) {
        if (username, password) {
            var queryString = "INSERT INTO user(username, password) VALUES (?, ?)";
            var queryArray = [username, password];

            connection.query(queryString, queryArray, function(err, results) {
                if (!err) {
                    var userId = results.insertId;
                    result.addResult('userId', userId)
                    console.log("successfully registerd user!")
                    done(result);
                } else {
                    if (configurations.debug.enabled && configurations.debug.databaseErrorMessages) {
                        console.log(err);
                    }
                    result.addFail(configurations.messages.register.__subject, configurations.messages.register.usernameTaken);
                    done(result);
                }
            })
        } else {
            result.addFail(configurations.messages.register.__subject, configurations.messages.register.missingInformation)
            done(result);
        }
    }

    var loginUser = function(username, password, result, done) {
        if (username, password) {
            var queryString = "SELECT iduser FROM user WHERE username = ? and password = ?";
            var queryArray = [username, password];
            connection.query(queryString, queryArray, function(err, results) {
                if (!err) {
                    if (results.length == 1 && results[0].iduser) {
                        console.log("success! logging in! " + results[0].iduser);
                        result.addResult('userId', results[0].iduser)
                        done(result);
                    } else {
                        result.addFail(configurations.messages.login.__subject, configurations.messages.login.incorrectInformation);
                        done(result)
                    }
                } else {
                    if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                        console.log(err);
                    }
                    result.addFail(configurations.messages.login.__subject, configurations.messages.global.incorrectInformation)
                    done(result)
                }
            })
        } else {
            result.addFail(configurations.messages.login.__subject, configurations.messages.login.missingInformation)
            done(result);
        }
    }

    var logoutUser = function(sessionId, result, done) {
        var queryString = "UPDATE session SET avaible = 0 where idsession = ?";
        var queryArray = [sessionId];
        connection.query(queryString, queryArray, function(err, results) {
            if (!err) {
                result.addSuccess();
                done(result);
            } else {
                if (configurations.debug.enabled && configurations.debug.databaseErrorMessage) {
                    console.log(err);
                }
                result.addFail(configurations.messages.logout.__subject, configurations.messages.logout.error);
                done(result);
            }
        })
    }

    return {
        logoutUser: logoutUser,
        loginUser: loginUser,
        registerUser: registerUser
    }
}