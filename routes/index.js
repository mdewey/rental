var express = require('express');
var router = express.Router();
var request = require('request')
/* GET home page. */
router.get('/', function(req, res, next) {
  var _url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search%20where%20location%3D%22sfbay%22%20and%20type%3D%22rtr%22%20and%20query%3D%22apartment%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  console.log("starting request");
  request.get(_url, (error, response, body) => {
    console.log('request complete', error, response.statusCode, body);
    let _json = JSON.parse(body);
    let _apartments = _json.query.results.RDF.item
    console.log("apartments", _apartments[0]);
    res.render('index', { title: 'Premiere Rental Properties', data: _apartments });
  });
});

module.exports = router;
