var Promise = require("promise");
var request = require("request");

// Common utility
class Common {
    constructor() { }

    // requestp
    requestp(url, json) {
        json = json || false;
        return new Promise(function (resolve, reject) {
            request({url:url, json:json}, function (err, res, body) {
                if (err) {
                    return reject(err);
                } else if (res.statusCode !== 200) {
                    err = new Error("Unexpected status code: " + res.statusCode);
                    err.res = res;
                    return reject(err);
                }
                resolve(body);
            });
        });
    }
}

module.exports = new Common();