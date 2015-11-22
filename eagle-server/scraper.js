var request = require('request');

function getFlightData(flightId, cb) {
  var FLIGHT_QUERY_URL = 'http://api.flightradar24.com/common/v1/flight/list.json';
  var url = FLIGHT_QUERY_URL + '?query=' + flightId + '&fetchBy=flight';
  console.log(url);
  request(url, function(err, res, body) {
    var json = JSON.parse(body);
    cb(err, json);
  });
}

module.exports.getFlightData = getFlightData;
