module.exports = function(modules, classes, configurations, database) {

    var createNewSession = function(req, result, done) {
        var sessionId = database.createSession(null, result, function(result) {
            req.session.sessionId = result.getResult('sessionId');
            done(result);
        })
    }

    var checkSessionId = function(req, result, done) {
        //TODO sessionID
        sessionId = req.session.sessionId;
        if (sessionId) {
            database.checkSessionStillAvaible(sessionId, result, function(result, userId, username, created, davey, moderator, joker) {
                if (result.successfull) {
                    req.session.userId = userId; // userId = null if not existing!
                    if (userId) {
                        var u = new classes.User(userId, username, created, davey, moderator, joker);
                        req.session.user = u;
                    }
                    done(result);
                } else {
                    result.resetSuccess();
                    createNewSession(req, result, done);
                }
            });
        } else {
            createNewSession(req, result, done);
        }
    }

    var checkSession = function(req, result, done) {
        database.updateSessions();
        req.session.userId = null;
        checkSessionId(req, result, function(result) {
            done(result);
        });
    }

    function registerUser(req, username, password, result, done) {
        database.registerUser(username, password, result, function(result) {
            if (result.successfull) {
                loginUser(req, username, password, result, done)
            } else {
                done(result);
            }
        })
    }

    function loginUser(req, username, password, result, done) {
        database.loginUser(username, password, result, function(result) {
            if (result.successfull) {
                req.session.oldsessionId = req.session.sessionId;
                var userId = result.getResult('userId');
                database.createSession(userId, result, function(result) {
                    var sessionId = result.getResult('sessionId');
                    req.session.userId = userId;
                    req.session.sessionId = sessionId;
                    checkSession(req, result, function(result) {
                        done(result);
                    })
                });
            } else {
                done(result);
            }

        })
    }

    function logoutUser(req, result, done) {
        sessionId = req.session.sessionId;
        if (sessionId) {
            database.logoutUser(sessionId, result, function(result) {
                if (result.successfull) {
                    if (req.session.oldsessionId) {
                        req.session.sessionId = req.session.oldsessionId;
                        req.session.oldsessionid = null;
                        checkSession(req, result, done);
                    } else {
                        createNewSession(req, result, done);
                    }
                } else {
                    done(result);
                }
            })
        } else {
            result.addFail(configurations.messages.logout.__subject, configurations.messages.logout.notLoggedIn);
            done(result);
        }
    }

    return {

        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        createNewSession: createNewSession,
        checkSessionId: checkSessionId,
        checkSession: checkSession

    }
}