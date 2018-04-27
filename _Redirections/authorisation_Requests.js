module.exports = function(modules, classes, database, data, context, app) {
    app.post('/login', function(req, res) {
        context.createContext(req, function(success, context) {
            var loginObject = req.body;
            var result = new classes.Result();
            data.loginUser(req, loginObject.username, loginObject.password, result, function(result) {
                console.log(result);
                result.send(res);
            })
        })
    });

    app.post('/register', function(req, res) {
        context.createContext(req, function(success, context) {

            var responseObject = { success: false }

            var registerObject = req.body;

            var result = new classes.Result();
            data.registerUser(req, registerObject.username, registerObject.password, result, function(result) {
                result.send(res);
            });
        });
    })



    // POST renders
    app.post('/logout', function(req, res) {
        context.createContext(req, function(success, context) {

            var responseObject = { success: true }
            var result = new classes.Result();
            data.logoutUser(req, result, function(result) {
                result.send(res);
            })
        })
    });
};