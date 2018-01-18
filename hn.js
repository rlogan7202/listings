// http://wolfstreet.com/

var cheerio = require('cheerio');
var request = require('request');
var common = require("./common.js");


var url = "https://news.ycombinator.com";
common.requestp(url, true)
    .then(parse.bind(null))
    .then(display.bind(null))
    .catch(function(err) { 
        console.error("error message: %s, url: %s", err.message, url);
        console.log("status code: %j", err.res.statusCode);
    });

function parse(data) {
    console.log('parse');
    console.log("entering with url:  %s", url);

    var $ = cheerio.load(data);
    var parsedResults = [];

    $('span.comhead').each(function(i, element) {
            var a = $(this).prev();
        var rank = a.parent().parent().text();
        var title = a.text();
        var url = a.attr('href');
        var subtext = a.parent().parent().next().children('.subtext').children();
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();
        var comments = $(subtext).eq(2).text();

        var id = $(this).parents('tr.athing').attr('id');
         // <tr class="athing" id="15133919">
        // Our parsed meta data object
        var metadata = {
            id: id,
            rank: parseInt(rank),
            title: title,
            url: url,
            points: parseInt(points),
            username: username,
            comments: parseInt(comments)
        };
        console.log(metadata);
        
        parsedResults.push(metadata);
    });

    return parsedResults;

}

function display(results) {
    console.log('display');
    results.forEach(function(element) {
        console.log(element.id + ' ' + element.title);
    });
}

// function (err) {
//     console.error("error message: %s, url: %s", err.message, url);
//     console.log("status code: %j", err.res.statusCode);
// });