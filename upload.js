var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var bucketName = "awsbucket4steinim2";
var filename = "courses/form1.txt";
var content = "The quick fox jumps over the lazy dog";

var params = {
  Bucket: bucketName,
  Key: filename,
  Body: content
};

s3.upload(params, function(err, data) {
    console.log(err, data);
});

