var express = require('express');
var router = express.Router();
var request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
 });


router.get('/listings', function(req, res, next) {
  let _location = {
    term: "tampa",
    city: "St Petersburg"
  }
  let _url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search%20where%20location%3D%22"+_location.term+"%22%20and%20type%3D%22rtr%22%20and%20query%3D%22pinellas%20apartments%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  request.get(_url, (error, response, body) => {
    let _json = JSON.parse(body);
    let _apartments = _json.query.results.RDF.item;
    res.render('listings', { title: 'Premiere Rental Properties', data: _apartments, city: _location.city });
  });
});

module.exports = router;
