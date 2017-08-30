var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var wolf = require('./hn.js');
var app     = express();

app.get('/hn', function(req, res) {

    url = 'https://news.ycombinator.com';
    
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            
            var $ = cheerio.load(html);
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
                // Our parsed meta data object
                var metadata = {
                    rank: parseInt(rank),
                    title: title,
                    url: url,
                    points: parseInt(points),
                    username: username,
                    comments: parseInt(comments)
                };
                // console.log(metadata);
                
                parsedResults.push(metadata);
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(parsedResults);
        }
    });

})

app.get('/gov', function(req, res) {

    url = 'https://www.governmentjobs.com/careers/denver?category[0]=IT%20and%20Computers&sort=Salary%7CDescending';
    
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log(url);
            var $ = cheerio.load(html);
            var parsedResults = [];

            $('#job-list-container > div.search-results-grid-container > table > tbody').find('tr').each(function(i, element) {
                // var a = $(this).prev();
                // var rank = a.parent().parent().text();
                // var title = a.text();
                // var url = a.attr('href');
                // var subtext = a.parent().parent().next().children('.subtext').children();
                // var points = $(subtext).eq(0).text();
                // var username = $(subtext).eq(1).text();
                // var comments = $(subtext).eq(2).text();
                // Our parsed meta data object
                // var metadata = {
                //     rank: parseInt(rank),
                //     title: title,
                //     url: url,
                //     points: parseInt(points),
                //     username: username,
                //     comments: parseInt(comments)
                // };
                // console.log(metadata);
                console.log('---------------------');
                console.log($(this));
                parsedResults.push($(this));
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(parsedResults);
        }
    });

})

app.get('/', function(req, res) {

    url = 'https://github.com/showcases';
    
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log(url);
            var $ = cheerio.load(html);
            var parsedResults = [];

            $('ul.exploregrid').find('li').each(function() {
                var anchor = $('a', this);
                var url = anchor.attr('href');
                var title = $('h3', this).text().trim();
                var p = $('p', this).text();

                var metadata = {
                    url: url,
                    title: title,
                    p: p
                };
                
                if(metadata)
                    parsedResults.push(metadata);
                
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(parsedResults);
        }
    });

})

app.listen('8081')
console.log('started on 8081');
exports = module.exports = app;