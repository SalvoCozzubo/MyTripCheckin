var MarkerController = function(app, db, io) {
    var MarkerModel = require('../models/Marker.js')(db);
    app.post('/markers', function(req, res) {

        var marker = new MarkerModel({
            lat: req.body.lat,
            lng: req.body.lng,
            type: req.body.type,
            speed: req.body.speed,
        });

        marker.save(function(err, markerResp) {
            if(err) res.status(500).send({data: [], error: err});
            else res.status(200).send({data: [], error: null});

            // posso pensare di inviare a tutti i connessi il nuovo punto
            io.sockets.emit('markers', [markerResp]);
        })
    });

    app.get('/markers', function(req, res) {
        var marker = MarkerModel.find({});

        marker.exec(function (err, markers) {
            if(err) res.status(500).send({data: [], error: err});
            else res.status(200).send({data: markers, error: null});
        });
    });

    io.on('connection', function(socket) {
        socket.on('markers', function() {
            console.log('markers ricevuto!');
            var marker = MarkerModel.find({});

            marker.exec(function (err, markers) {
                socket.emit('markers', markers);
            });
        });
    });

}

module.exports = MarkerController;
