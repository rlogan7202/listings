// https://www.governmentjobs.com/browse/location
// https://www.governmentjobs.com/jobs?keyword=IT%20and%20Computers
// https://www.governmentjobs.com/careers/denver?category[0]=IT%20and%20Computers&sort=Salary%7CDescending
// https://www.governmentjobs.com/jobs?keyword=Senior%20Programming%20Analyst&category%5B0%5D=IT%20and%20Computers&organization%5B0%5D=State%20of%20Oregon
// https://www.governmentjobs.com/careers/denver?category[0]=IT%20and%20Computers&sort=Salary%7CDescending
//
// https://www.governmentjobs.com/jobs?location=Alameda%2C+CA&category%5B0%5D=IT%20and%20Computers&distance=25
var cheerio = require('cheerio');
var request = require('request');
var elastic = require('./es');

var url = 'https://www.governmentjobs.com/browse/location';
var urls = [
    {url:'https://www.governmentjobs.com/browse/location'}
];

urls.filter(function(site) {

    request({
        method: 'GET',
        url: site.url
    }, function(err, response, body) {
        if (err) return console.error(err);
        console.log('-----------------------------------------------');
        console.log('-----------------------------------------------');
        console.log(site.url);

        // Tell Cherrio to load the HTML
        $ = cheerio.load(body);
        $('ul.unstyled').find('li.criteria-container').each(function() {
                //console.log('hit');
                var anchor = $('a.criteria-header', this);
                
                var location = anchor.text().trim();

                var childLocationDiv = 'div.location-' + location.replace(" ", "");
                var childLocations = $('li.criteria-detail-container', childLocationDiv);

                $(childLocationDiv).find('li.criteria-container').each(function() {
                    var childAnchor = $('a.criteria-detail-container-link', childLocations);
                    
                    var childUrl = childAnchor.attr('href');
                    console.log(childAnchor);
                });

                
                var anchor2 = $('a.criteria-detail-container-link', this);

                var url = anchor2.attr('href');

                if(url) {
                    var metadata = {
                        id: location,
                        url: url,
                        location: location,
                        childLocations: childLocations
                    }
                    //var location = $('div.ui.li.a', this);

                    //console.log(metadata);


                    // var elasticsearch = require('elasticsearch');
                    
                    // var elasticClient = new elasticsearch.Client({
                    //     host: 'localhost:9200',
                    //     log: 'info'
                    // });
                    // return elasticClient.index({
                    //     id: metadata.id,
                    //     index: 'listings',
                    //     type: 'location',
                    //     body: metadata
                    // }).then(function (response) {
                    //     console.log(response.result + ' ' + response._id + ' ' + response._version);
                    //   }, function (error) {
                    //     console.trace(error.message);
                    //   });
                }
        });
    });
});
