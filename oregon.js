// https://www.governmentjobs.com/jobs?category%5B0%5D=IT%20and%20Computers&organization%5B0%5D=State%20of%20Oregon

// portland
// https://www.governmentjobs.com/careers/portlandor

// http://wolfstreet.com/

var cheerio = require('cheerio');
var request = require('request');
var common = require("./common.js");


var url = "https://www.governmentjobs.com/careers/portlandor";
common.requestp(url, true)
    .then(parse.bind(null))
    .then(display.bind(null))
    .catch(function(err) { 
        console.error("error message: %s, url: %s", err.message, url);
        console.log("status code: %j", err.res.statusCode);
    });

function parse(data) {
    console.log("parse with url:  %s", url);
    console.log(data);
    var $ = cheerio.load(data);
    var parsedResults = [];

    $('li.list-item').each(function(i, elm) {
        console.log(elm) // for testing do text() 
    });

    console.log($('#job-list-container').length);
    $('div.search-results-container').find('li').each(function(i, element) {
        console.log('each');
        var a = $('h3 a', this).text().trim();
        var rank = "rank";
        var title = $(this).text();
        var url = $(this).attr('href');


        var id = $(this).parents('tr.athing').attr('id');
         // <tr class="athing" id="15133919">
        // Our parsed meta data object
        var metadata = {
            id: id,
            rank: parseInt(rank),
            title: title,
            url: url,
            points: null,
            username: null,
            comments: null
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