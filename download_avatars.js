var request = require('request');
var secrets = require('./secrets');


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
  result.forEach(function(element){
    console.log(`\n`);
    console.log(element.avatar_url);
  });
  console.log("Errors:", err);
});