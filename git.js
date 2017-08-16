var cheerio = require('cheerio');
var request = require('request');

request({
    method: 'GET',
    url: 'https://github.com/showcases'
}, function(err, response, body) {
    if (err) return console.error(err);

    // Tell Cherrio to load the HTML
    $ = cheerio.load(body);
    $('ul.exploregrid').find('li').each(function() {
            //console.log('hit');
            var anchor = $('a', this);
            var url = anchor.attr('href');
            var title = $('h3', this).text().trim();
            var p = $('p', this).text();

            console.log("url:" + url);
            console.log("title:" + title);
            console.log("p:" + p);
    });
});