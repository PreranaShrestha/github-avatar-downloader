var request = require("request");
var fs = require('fs');
require('dotenv').config()



function getRepoContributors(repoOwner, repoName, cb) {
  if(process.env.token === undefined) {
    console.log("token not defined");
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent':'PreranaShrestha',
        'Authorization': "token " + process.env.token
      }
    }
    request(options, function(err, res, body) {
      var bodyObj = JSON.parse(body);
      // console.log(bodyObj);
      if (err) {
        console.log('Error:' + err);
      }
      if (bodyObj.message === 'Not Found') {
      } else if (bodyObj.message === 'Bad credentials') {
        console.log('Bad credentials');
      } else {
        cb(err, bodyObj);
      }
    });
  }
}

function recommend(result, cb) {
  result.forEach(function(id) {
    var options = {
       url: id.starred_url.slice(0, id.starred_url.indexOf('{')),
      headers: {
        'User-Agent':'PreranaShrestha',
        'Authorization': "token " + process.env.token
      }
    }
    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
    });
  });
}

function countStar(){
  count++;
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
  downloadImageByURL: downloadImageByURL,
  recommend: recommend,
  countStar: countStar
}




