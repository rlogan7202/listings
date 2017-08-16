var request = require('request-promise');

var govjobs = {
  url: null,
  
  getListings: function() {
    return request({
      "method":"GET", 
      "uri": govjobs.url,
      "json": true,
      "headers": {
        "User-Agent": "My little demo app"
      }
    }).then(function(response) {
      if (!repos) {
        repos = [];
      }
      repos = repos.concat(response.body);
      console.log(repos.length + " repos so far");
      
      if (response.headers.link.split(",").filter(function(link){ return link.match(/rel="next"/) }).length > 0) {
        console.log("There is more.");
        var next = new RegExp(/<(.*)>/).exec(response.headers.link.split(",").filter(function(link){ return link.match(/rel="next"/) })[0])[1];
        return github.getUserRepos(next, repos);
      }
      return repos;
    });
  }
}

function main(params) {
  govjobs.url = params.url;
  return govjobs.getListings();
}

main({"url": "https://www.governmentjobs.com/careers/denver?category[0]=IT%20and%20Computers&sort=Salary%7CDescending"}).then(function(result) {
  console.log(result);
});