module.exports = function(modules, classes, configurations, connection) {

    var BRUTEchangeAdminRights = function(targetUserId, davey, moderator, joker, result, done) {
        var doingSomething = false;

        var queryString = 'UPDATE user SET ';
        var queryArray = [];

        if (davey == 1) {
            queryString += 'davey = ? ';
            queryArray.push(davey);
            doingSomething = true;
        }
        if (moderator == 0 || moderator == 1) {
            queryString += 'moderator = ? ';
            queryArray.push(moderator);
            doingSomething = true;
        }
        if (joker == 0 || joker == 1) {
            queryString += 'joker = ? ';
            queryArray.push(joker);
            doingSomething = true;
        }
        queryString += 'WHERE iduser = ?; ';
        queryArray.push(targetUserId);

        if (doingSomething) {
            connection.query(queryString, queryArray, function(err, results) {
                if (!err) {
                    if (results.affectedRows == 1) {
                        result.addSuccess();
                        done(result);
                    } else {
                        console.log("oops affected " + results.affectedRows + " rows... With queryString " + queryString + ".");
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
        } else {
            done(false);
        }
    }

    var getUsers = function(result, done) {
        var queryString = 'SELECT iduser, username, created, davey, moderator, joker from user;';
        var queryArray = [];
        connection.query(queryString, queryArray, function(err, results) {
            if (!err) {
                result.addResult('userFields', results);
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

    return {
        getUsers: getUsers,
        BRUTEchangeAdminRights: BRUTEchangeAdminRights
    }
}