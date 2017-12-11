"use strict"

// Require Logic
var short = require("short")
var log4js = require('log4js');
log4js.configure({
  appenders: { 'file': { type: 'file', filename: 'urlresolver.log' } },
  categories: { default: { appenders: ['file'], level: 'debug' } }
});

var logger = log4js.getLogger('urlshortener');

//local testing
//var mongoDbUrl =`mongodb://urlshortener:urlsh0rt3n3r@localhost:27017/admin`;

var mongoDbUrl =`mongodb://urlshortener:urlsh0rt3n3r@mongodb:27017/admin`;

module.exports = (context, callback) => {
    const url = JSON.parse(context);
    // connect to mongodb
    logger.debug ( "url:" + url);
    logger.debug("mongo:" + mongoDbUrl);
    short.connect(mongoDbUrl);

    logger.debug("context: " + context);

    short.connection.on('error', function(error) {
        callback(error, null);
    });
    // promise to generate a shortened URL.
    //context should be a JSON doc like { shortURL: "456789"}
    var shortURLRetrievePromise = short.retrieve(url.shortURL);

    // gets back the short url document, and then retrieves it
    shortURLRetrievePromise.then(function(result) {
        logger.debug("shorten:" + result);
        callback(null, result.URL);
      }, function(error) {
          if (error) {
              logger.debug(error);
              callback(error, null);
          }
    });
}
