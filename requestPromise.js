var request = require('request-promise');

var github = {
  token: null,
  
  getUser: function() {
    return request({
      "method":"GET", 
      "uri": "https://api.github.com/user",
      "json": true,
      "headers": {
        "Authorization": "Bearer " + github.token,
        "User-Agent": "My little demo app"
      }
    });
  },
  
  getUserReposUrl: function(user) {
    return user.repos_url;
  },
  
  getUserRepos: function(uri, repos) {
    return request({
      "method": "GET",
      "uri": uri,
      "json": true,
      "resolveWithFullResponse": true,
      "headers": {
        "Authorization": "Bearer " + github.token,
        "User-Agent": "My little demo app"
      }
    }).then(function(response) {
      if (!repos) {
        repos = [];
      }
      repos = repos.concat(response.body);
      console.log(repos.length + " repos so far");
      console.log(response.headers);
    //   if (response.headers.link.split(",").filter(function(link){ return link.match(/rel="next"/) }).length > 0) {
    //     console.log("There is more.");
    //     var next = new RegExp(/<(.*)>/).exec(response.headers.link.split(",").filter(function(link){ return link.match(/rel="next"/) })[0])[1];
    //     return github.getUserRepos(next, repos);
    //   }
      return repos;
    });
  },
  
  isPublic: function(repo) {
    return !repo.private;
  },
  
  isOriginal: function(repo) {
    return !repo.fork;
  },
  
  licenseUrl: function(repo) {
    return repo.contents_url.replace(/\{\+path\}/,"LICENSE");
  },
  
  checkLicense: function(uri) {
    return request({
      "method": "GET",
      "uri": uri,
      "json": true,
      "headers": {
        "Authorization": "Bearer " + github.token,
        "User-Agent": "My little demo app"
      }
    }).then(function(fulfilled_body) {
      return false;
    }, function(rejected_body){
      return uri;
    });
  },
  
  isMissing: function(license) {
    return license;
  },
  
  createLicenseLink: function(license) {
    return license.replace(/https:\/\/api.github.com\/repos\/(.*)\/(.*)\/contents\/LICENSE/, "https://github.com/$1/$2/new/master?filename=LICENSE");
  }
}

function main(params) {
  github.token = params.token;
  return github.getUser()
    .then(github.getUserReposUrl)
    .then(github.getUserRepos)
    .filter(github.isPublic)
    .filter(github.isOriginal)
    .map(github.licenseUrl)
    .map(github.checkLicense)
    .filter(github.isMissing)
    .map(github.createLicenseLink);
}

main({"token": process.argv[2]}).then(function(result) {
  console.log(result);
});