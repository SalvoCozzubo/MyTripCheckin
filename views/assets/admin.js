var lat = 0;
var lng = 0;
var speed = 0;

$(function() {
    getLocation();

    $('.btn').click(function() {
        var type = $(this).data('type');

        switch(type) {
            case 'alert':
                if(!confirm('Hai scelto "ALERT"! Sei sicuro?')) {
                    return;
                }
        }

        sendMarkerAjax(lat, lng, type);
    });
});

function sendMarkerAjax(lat, lng, type) {
    $.ajax({
        url: '/markers',
        method: 'POST',
        data: {
            lat: lat,
            lng: lng,
            type: type,
            speed: speed,
        }
    }).success(function() {
        alert('Marker inviato con successo :-)');
    }).fail(function() {
        alert('Errore durante la creazione del marker');
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    speed = position.coords.speed;
    $('#lat').html('<b>Latitude</b>: ' + lat);
    $('#lng').html('<b>Longitude</b>: ' + lng);
    $('#speed').html('<b>Speed</b>: ' + speed + ' km/h');
}
