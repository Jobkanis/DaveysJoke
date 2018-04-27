module.exports = function(modules, classes, database, data, context, app) {

    app.get("/", function(req, res) {
        context.createContext(req, function(success, context) {
            if (success) {
                res.render('pages/mainpage.ejs', context);
            } else {
                res.send("Oops something went wrong loading adminpage!");
            }
        })
    })
}