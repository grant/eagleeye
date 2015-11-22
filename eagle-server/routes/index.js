var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/flights', function(req, res, next) {
  res.send([
  {
    id: 'awegawegio',
    flightId: 'AA1234',
    from: 'LAX',
    to: 'SFO'
  },
  {
    id: 'zzzworigwjegoiojei',
    flightId: 'UV3485',
    from: 'LAS',
    to: 'PAR'
  }
  ]);
});

module.exports = router;
