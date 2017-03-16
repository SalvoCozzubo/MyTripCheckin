var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var ejs = require('ejs');
var mongoose = require('mongoose');

app.engine('ejs', ejs.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('node_modules'));
app.use(express.static('views/assets'));
app.use(bodyParser.urlencoded({ extended: true }));

var mongoDbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var mongoDbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || '';

var dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';
mongoose.connect(dbUrl + 'mytripcheckin');

mongoose.connection.once('open', function() {
    require('./controllers/Marker.js')(app, mongoose, io);
    require('./controllers/Page.js')(app);
});

http.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function() {
    console.log('Server is started');
});
