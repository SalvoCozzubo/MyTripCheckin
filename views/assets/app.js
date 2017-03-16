function getMarkers(map) {
    var schema = port == 3000 ? 'http' : 'https'
    var socket = io.connect(schema + '://' + host + ':' + port);

    socket.on('connect', function() {
        console.log('connesso!');

        socket.emit('markers', 'markers');

        socket.on('markers', function(markers) {
            console.log(markers);


            var num = markers.length;
            for(index = 0; index < num; index++) {

                var marker = new google.maps.Marker({
                    position: {lat: markers[index].lat, lng: markers[index].lng},
                });

                console.log(marker);
                marker.setMap(map)
                //console.log(markers[index]);
            }
                //$('#marker-container').append('<div>lat: ' + markers.lat + ' lng: ' + markers.lat + ' type: ' + markers.type + '</div>')
        });
    });

    socket.on('disconnect', function() {
        console.log('disconnesso');
    })
}
