var AWS = require('aws-sdk');
var bucketName = "awsbucket4steinim2";
var s3 = new AWS.S3(
  {
    params: {
      Bucket: bucketName
    }
  });

s3.createBucket(function(err) {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Bucket " + bucketName + " created!");
  }
});

