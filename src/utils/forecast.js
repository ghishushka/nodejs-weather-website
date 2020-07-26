const request = require('request');

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=026ca21190f31e8eb8df348e96e6434d&query=' + address;

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = forecast;