var MarkerModel = function(db) {
    var markerSchema = db.Schema({
        lat: Number,
        lng: Number,
        type: String,
        speed: Number,
    }, { timestamps: true});

    return db.model('Marker', markerSchema);
}

module.exports = MarkerModel;
