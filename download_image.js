var request = require("request");
process.env.token
var fs = require('fs');
require('dotenv').config()

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent':'PreranaShrestha',
      'Authorization': "token " + process.env.token
    }
  }
  request(options, function(err, res, body) {
    var bodyObj = JSON.parse(body);
    if(bodyObj.message === 'Not Found') {
      console.log("File not found");
    } else {
      cb(err, bodyObj);
    }
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}
module.exports = {
  getRepoContributors: getRepoContributors,
  downloadImageByURL: downloadImageByURL
}






