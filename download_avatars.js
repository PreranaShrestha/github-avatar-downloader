var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent':'PreranaShrestha',
      'Authorization': secrets.token
    }
  }
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));

  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  if(err) {
    console.log("Errors:", err);
  }
  result.forEach(function(element){
    console.log(`\n`);
    downloadImageByURL(element.avatar_url, "avatars/" + element.login + ".jpg");
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}