var Promise = require("promise");
var request = require("request");
var common = require("./common.js");

var url = "https://raw.github.com/mikeal/request/master/package.json";

common.requestp(url, true).then(function (data) {
    console.log("url:  %s", url);
    console.log("name: %s, version: @%s, description: %s", data.name, data.version, data.description);
    console.log(data);
}, function (err) {
    console.error("error message: %s, url: %s", err.message, url);
    console.log("status code: %j", err.res.statusCode);
});

