// http://wolfstreet.com/

var cheerio = require('cheerio');
var request = require('request');

request({
    method: 'GET',
    url: 'http://wolfstreet.com'
}, function(err, response, body) {
    if (err) return console.error(err);

    // Tell Cherrio to load the HTML
    $ = cheerio.load(body);
    $('div.row').find('article').each(function() {
            //console.log($(this));
            var header = $('h1.entry-title', this);
            var anchor = $('a', header);
            var anchorTitle = anchor.text().trim();
            var anchorURL = anchor.attr('href');

            var excerpt = $('div.excerpt', this);
            var excerptText = $('p', header).text().trim();
            // var p = $('p', this).text();
            var metadata = {
                title: anchorTitle,
                url: anchorURL,
                description: excerptText
                
            }

            console.log(metadata);
    });
});