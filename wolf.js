// http://wolfstreet.com/

var cheerio = require('cheerio');
var request = require('request');
var common = require("./common.js");

var url = "http://wolfstreet.com";

common.requestp(url, true).then(function (data) {
    console.log("entering with url:  %s", url);

    $ = cheerio.load(data);
    $('div.row').find('article').each(function() {
        //console.log($(this));
        var header = $('h1.entry-title', this);
        var anchor = $('a', header);
        var anchorTitle = anchor.text().trim();
        var anchorURL = anchor.attr('href');

        var excerpt = $('div.excerpt', this);
        var excerptText = $('p', excerpt).text().trim();
        // var p = $('p', this).text();
        var metadata = {
            title: anchorTitle,
            url: anchorURL,
            description: excerptText
        }

        console.log(metadata);
    });

}, function (err) {
    console.error("error message: %s, url: %s", err.message, url);
    console.log("status code: %j", err.res.statusCode);
});