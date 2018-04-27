module.exports = function(modules, classes, configurations, database) {

    var changeModerate = function(userId, change, result, done) {
        database.BRUTEchangeAdminRights(userId, null, change, null, result, function(result) {
            done(result);
        })
    }

    var changeJoker = function(userId, change, result, done) {
        database.BRUTEchangeAdminRights(userId, null, null, change, result, function(result) {
            done(result);
        })
    }

    var addDavey = function(userId, result, done) {
        database.BRUTEchangeAdminRights(userId, 1, null, null, result, function(result) {
            done(result);
        })
    }

    var getUsers = function(result, done) {
        database.getUsers(result, function(result) {
            if (result.successfull) {
                var results = result.GRAPResult('userFields');
                var users = [];
                for (var i = 0; i < results.length; i++) {
                    var row = results[i];
                    if (row) {
                        users.push(new classes.User(row.iduser, row.username, row.created, row.davey, row.moderator, row.joker));
                    }
                }
                result.addResult('users', users);
                done(result);
            } else {
                result.addFail('', ''); //TODO
                done(result);
            }
        })
    }

    return {
        changeModerate: changeModerate,
        changeJoker: changeJoker,
        addDavey: addDavey,
        getUsers: getUsers,
    }
}