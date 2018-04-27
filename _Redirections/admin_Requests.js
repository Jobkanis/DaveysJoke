module.exports = function(modules, classes, database, data, context, app) {

    app.get("/admin", function(req, res) {
        context.createAdminContext(req, function(success, context) {
            if (success) {
                res.render('pages/adminpage.ejs', context);
            } else {
                if (context) {
                    if (context.loggedIn == false) {
                        context.message = "Make sure you are logged in as moderator to view this page!"
                        res.render('pages/errorpage.ejs', context);
                    } else {
                        context.message = "You have to be a moderator or up to see this page!"
                        res.render('pages/errorpage.ejs', context);
                    }

                } else {
                    res.send("Oops something went wrong loading adminpage!");
                }
            }
        })
    })

    app.post('/changeJoker', function(req, res) {
        context.createAdminContext(req, function(success, context) {

            var result = new classes.Result();

            var receivedObject = req.body;
            var targetUserId = parseInt(receivedObject.userId); //save way of sending userId???? -> page only loaded for moderators, so should be fine...
            var change = receivedObject.change;

            if ((success) && ((context.moderator == true && targetUserId != context.userId) || context.davey == true)) {

                if (change == 'true') {
                    change = 1;
                } else if (change == 'false') {
                    change = 0;
                } else {
                    change = null;
                }

                data.changeJoker(targetUserId, change, result, function(result) {
                    result.send(res);
                })
            } else {
                result.addFail('', '') // TODO
                result.send(res);
            }

        })
    });

    app.post('/changeModerator', function(req, res) {
        context.createAdminContext(req, function(success, context) {

            var result = new classes.Result();

            if ((success) && (context.davey == true)) {
                //{userId: 1213, change: true}

                var receivedObject = req.body;
                var targetUserId = parseInt(receivedObject.userId); //save way of sending userId???? -> page only loaded for moderators, so should be fine...
                var change = receivedObject.change;

                if (change == 'true') {
                    change = 1;
                } else if (change == 'false') {
                    change = 0;
                } else {
                    change = null;
                }

                data.changeModerate(targetUserId, change, result, function(result) {
                    result.send(res);
                })
            } else {
                result.addFail('', '') // TODO
                result.send(res);
            }

        })
    });

    app.post('/addDavey', function(req, res) {
        context.createAdminContext(req, function(success, context) {
            console.log(context.userId + " tried to add a davey! This is only currently disabled hehe!");

            result = new Result();
            result.addFail('', '') //TODO
            result.send(res);

            /*
            if ((success) && context.davey == true) {
                //{userId: 1213, change: true}

                var receivedObject = req.body;
                var targetUserId = parseInt(receivedObject.userId); //save way of sending userId???? -> page only loaded for moderators, so should be fine..
                
                    responseObject.success = success
                    res.send(responseObject);
                })
            } else {
                
                res.send(responseObject);
            }
            */

        })
    });
};