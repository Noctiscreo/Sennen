// Required for Node:
var express = require('express');
var app = express();
const fetch = require('node-fetch');

/**
 * getLatLong creates a random number.
 * @param from = starting number
 * @param to = end number
 * @param fixed = number of decimal places
 * @returns {float}
 */
function getLatLong(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed((fixed) * 1)
}

/**
 * getSunriseSunset calls getLatLong twice to generate a latitude & longitude.
 * It then connects to API with generated lat/long and queries for sunrise and sunset.
 */
function getSunriseSunset () {

    var lat = getLatLong(-180, 180, 7);
    var long = getLatLong(-90, 90, 7);

    fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long)
        .then(data => data.json())
        .then(data => {
            console.log("Lat: " + lat + ", Long: " + long);
            console.log("Sunrise: " + data.results.sunrise);
            console.log("Sunset: " + data.results.sunset);
        })
        .catch(error => {
            console.log('Error!');
            console.error(error);
        });
    getLatLong();
}

// Runs the getSunriseSunset function 5 times every 5 seconds.
for (var i = 0; i <=4; i++) {
    setInterval(getSunriseSunset, 5000);
}

app.listen(3000);