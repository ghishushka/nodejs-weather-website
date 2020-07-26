const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '%20center.json?access_token=pk.eyJ1IjoiZGVuaXMtc2xvbm92c2NoaSIsImEiOiJja2N6dHc2b2gwNG44MzBvMWNsdmxpNGV0In0.Wxf-poKklahdAZ1eUCG3cw&limit=1';

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            const returnData = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, returnData);
        }
    });
}

module.exports = geocode;