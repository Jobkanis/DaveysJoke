module.exports = function(modules, classes, configurations, database) {

    var admin_Data = require('./admin_Data')(modules, classes, configurations, database);
    var authorisation_Data = require('./authorisation_Data')(modules, classes, configurations, database);
    var joke_Data = require('./joke_Data')(modules, classes, configurations, database);

    return function() {

        var returnObject = new Object();

        for (var key in admin_Data) {
            returnObject[key] = admin_Data[key];
        }

        for (var key in authorisation_Data) {
            returnObject[key] = authorisation_Data[key];
        }

        for (var key in joke_Data) {
            returnObject[key] = joke_Data[key];
        }

        return returnObject;
    }()
};