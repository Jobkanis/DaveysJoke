module.exports = function(modules, classes, configurations) {

    var mysql = require('mysql');
    var serverconnection = require('./_database_Connection')(mysql);

    var connection = serverconnection.Offlineconnection;

    if (configurations.database.online_connection) {
        var connection = serverconnection.Onlineconnection;
    }

    var admin_Database = require('./admin_Database')(modules, classes, configurations, connection);
    var authorisation_Database = require('./authorisation_Database')(modules, classes, configurations, connection);
    var jokes_Database = require('./jokes_Database')(modules, classes, configurations, connection);
    var session_Database = require('./session_Database')(modules, classes, configurations, connection);

    return function() {

        var returnObject = new Object();

        for (var key in admin_Database) {
            returnObject[key] = admin_Database[key];
        }

        for (var key in authorisation_Database) {
            returnObject[key] = authorisation_Database[key];
        }

        for (var key in jokes_Database) {
            returnObject[key] = jokes_Database[key];
        }

        for (var key in session_Database) {
            returnObject[key] = session_Database[key];
        }

        return returnObject;
    }()
}