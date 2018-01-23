var repoOwner = process.argv[2];
var repoName = process.argv[3];
if(repoName === undefined || repoOwner === undefined) {
  console.log("Argument not passed");
} else {
  var avatar = require('./download_image');
  var downloadImageByURL = require('./download_image');
  avatar.getRepoContributors(repoOwner, repoName, function(err, result) {
    if(err) {
      console.log("Errors:", err);
    } else {
      result.forEach(function(element){
      console.log(`\n`);
      avatar.downloadImageByURL(element.avatar_url, "avatars/" + element.login + ".jpg");
      });
    }
  });
}

