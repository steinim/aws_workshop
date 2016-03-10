var AWS = require('aws-sdk');
var fs = require('fs');
var s3 = new AWS.S3();

var bucketName = "awsbucket4steinim2";
var filename = "courses/form1.txt";
var content = "The quick fox jumps over the lazy dog";

var params = {
  Bucket: bucketName,
  Key: 'courses/form1.txt',
};

s3.getObject(params, function(err, data) {
  if (err === null) {
    fs.writeFile('./downloads/form1.txt', data.Body, function(err) {
      if (err) {
        return console.log(err, data);
      }
      console.log('File downloaded!');
    });
  } else {
    console.log(err);
  }

});

