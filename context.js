module.exports = function(modules, classes, configurations, database, data) {

    var createContext = function(req, done) {

        var sessionId = req.session.sessionId;
        var userId = req.session.userId;

        var context = {
            jokes: [],
            sessionId: sessionId,
            loggedIn: false,

            message: "",

            userId: userId,
            username: "",
            joker: false,
            moderator: false,
            davey: false,
            users: null
        }

        if (userId) {
            context.loggedIn = true;

            var currentuser = req.session.user;
            if (currentuser) {
                context.username = currentuser.username;
                context.joker = currentuser.joker;
                context.moderator = currentuser.moderator;
                context.davey = currentuser.davey;
            }
        }

        var jokes = data.getJokes(sessionId, userId, new classes.Result(), function(result) {
            if (result.successfull) {
                context.jokes = result.getResult('jokes');
                return done(true, context);
            } else {
                console.log("Error retrieving jokes!");
                return done(false)
            }
        });
    }

    var createAdminContext = function(req, done) {
        createContext(req, function(success, context) {
            if ((success) && (context.davey || context.moderator)) {
                var result = new classes.Result();
                var users = data.getUsers(result, function(result) {
                    if (result.successfull) {
                        var users = result.GRAPResult('users');
                        context.users = users;
                        done(true, context);
                    } else {
                        done(false, context)
                    }
                })
            } else {
                if (context) {
                    done(false, context);
                } else {
                    done(false);
                }
            }
        })
    }

    return {
        createContext: createContext,
        createAdminContext: createAdminContext
    }
}