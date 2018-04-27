module.exports = function(modules, classes, database, data, context, app) {

    app.post("/renderMainpage", function(req, res) {
        context.createContext(req, function(success, context) {
            if (success) {
                var responseObject = { success: false, html: "" }

                var html = modules.ejs.renderFile('views/mains/mainpage_main.ejs', context, function(error, string) {
                    if (!error) {
                        responseObject.success = true;
                        responseObject.html = string;
                        res.send(responseObject);
                    } else {
                        console.log(error);
                        res.send(responseObject);
                    }
                });
            } else {
                console.log("error rendering mainpage!")
            }
        });
    })

    app.post("/renderAdminpage", function(req, res) {
        context.createAdminContext(req, function(success, context) {
            if (success) {
                var responseObject = { success: false, html: "" }

                var html = modules.ejs.renderFile('views/mains/adminpage_main.ejs', context, function(error, string) {
                    if (!error) {
                        responseObject.success = true;
                        responseObject.html = string;
                        res.send(responseObject);
                    } else {
                        console.log(error);
                        res.send(responseObject);
                    }
                });
            } else {
                console.log("error rendering adminpage!")
            }
        });
    })

    app.post("/renderHeader", function(req, res) {
        context.createContext(req, function(success, context) {
            if (success) {
                var responseObject = { success: false, html: "" }

                var string = modules.ejs.renderFile('views/partials/header.ejs', context, function(error, string) {
                    if (!error) {
                        responseObject.success = true;
                        responseObject.html = string;
                        res.send(responseObject);
                    } else {
                        console.log(error);
                        res.send(responseObject);
                    }
                });
            } else {
                console.log("error rendering header!")
            }
        });
    })

    app.post("/renderFooter", function(req, res) {
        context.createContext(req, function(success, context) {
            if (success) {
                var responseObject = { success: false, html: "" }

                var string = modules.ejs.renderFile('views/partials/footer.ejs', context, function(error, string) {
                    if (!error) {
                        responseObject.success = true;
                        responseObject.html = string;
                        res.send(responseObject);
                    } else {
                        console.log(error);
                        res.send(responseObject);
                    }
                });
            } else {
                console.log('error loading footer');
            }
        });
    })
};