var online = false;

var modules = {
    express: require('express'),
    http: require('http'),
    path: require('path'),
    JSON: require('JSON'),
    ejs: require('ejs'),
    session: require('express-session')
}

var configurations = require('./configurations');

var classes = require('./_Classes/_classes');
var database = require('./_Database/_database')(modules, classes, configurations);
var data = require('./_Data/_data')(modules, classes, configurations, database);

var context = require('./context')(modules, classes, configurations, database, data);

var app = modules.express();
app.set('view engine', 'ejs');

var requests = require('./_Redirections/_redirections')(modules, classes, configurations, database, data, context, app);

modules.http.createServer(app).listen(4000)