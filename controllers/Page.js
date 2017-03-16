var PageController = function(app) {
    app.get('/', function(req, res) {
        res.render('client');
    });

    app.get('/admin', function(req, res) {
        res.render('admin');
    });
}

module.exports = PageController;
