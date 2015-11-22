var express = require('express');
var router = express.Router();

var getFlightData = require('../scraper').getFlightData;

var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/eagleeye';

var DB;
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  DB = db;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/flights', function(req, res, next) {
  // Use connect method to connect to the Server
  DB.collection('myflights').find({}).toArray(function(err, result) {
    res.send(result);
  });

  // res.send([
  // {
  //   id: 'awegawegio',
  //   flightId: 'AA1234',
  //   from: 'LAX',
  //   to: 'SFO'
  // },
  // {
  //   id: 'zzzworigwjegoiojei',
  //   flightId: 'UV3485',
  //   from: 'LAS',
  //   to: 'PAR'
  // }
  // ]);
});

router.post('/flight', function(req, res, next) {
  var flightId = req.body.flightId;


  var US_FLIGHTS_URL = 'http://data.flightradar24.com/zones/fcgi/feed.js?bounds=40.87813547855707,34.208015737739174,-126.83645200553883,-122.23388671875';



  getFlightData(flightId, function(err, result) {
    console.log('get all data');
    // This is a valid flight
    if (result.result.response.item.current > 0) {
      var data = result.result.response.data;
      var from = data[0].airport.origin.code.iata;
      var to = data[0].airport.destination.code.iata;

      // console.log('getting ' + US_FLIGHTS_URL);
      // request(US_FLIGHTS_URL, function (e2, response2, body2) {
      //   console.log('got it');
      //   if (!e2 && response2.statusCode == 200) {
      //     var json = JSON.parse(body2);
      //     delete json.version;
      //     delete json.full_count;
      //     var keys = Object.keys(json);
      //     var lat = 0, lng = 0;
      //     for (var i = 0; i < keys.length; ++i) {
      //       var key = keys[i];
      //       var data = json[key];
      //       if (data[9] == flightId) {
      //         lat = data[1];
      //         lng = data[2];
      //       }
      //     }

          DB.collection('myflights').insertOne({
            id: ("" + Math.random()).substr(3),
            flightId: flightId,
            from: from,
            to: to,
          }, function(err, done) {
            res.send({status: 'thanks'});
          });


      //   }
      // });

    }
  });
});

// Deletes a flight
router.post('/flightdel', function(req, res, next) {
  console.log('trying to delete ' + req.body.flightId);
  var id = ''+req.body.flightId;
  DB.collection('myflights').deleteOne({id: id}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log('deleted');
    res.send({status: 'good'});
  });
});

module.exports = router;
