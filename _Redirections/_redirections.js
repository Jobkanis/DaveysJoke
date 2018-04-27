module.exports = function(modules, classes, configurations, database, data, context, app) {

    app.use(modules.express.static(modules.path.join(__dirname, '../public')));
    app.use(modules.express.urlencoded({ extended: true }));

    app.use(modules.session({
        secret: 'this-is-my-secret',
        cookie: {}
    }));

    app.use(function(req, res, next) {
        var result = new classes.Result();
        data.checkSession(req, result, function() {
            if (configurations.debug.enabled) {
                if (configurations.debug.showRequests) {
                    console.log('%s\t%s\t%s', new Date, req.method, req.url);
                }
                if (configurations.debug.showSessions) {
                    console.log(req.session);
                }
            }
            next();
        })
    })

    get_Requests = require('./get_Requests')(modules, classes, database, data, context, app);
    authorisation_Requests = require('./authorisation_Requests')(modules, classes, database, data, context, app);
    admin_Requests = require('./admin_Requests')(modules, classes, database, data, context, app);
    joke_Requests = require('./joke_Requests')(modules, classes, database, data, context, app);
    render_Requests = require('./render_Requests')(modules, classes, database, data, context, app);
};