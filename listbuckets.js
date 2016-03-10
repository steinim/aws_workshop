var AWS = require('aws-sdk');
AWS.config.loadFromPath('awsconfig.json');

var s3 = new AWS.S3();

s3.listBuckets(function(err,data) {
  if (err) {
    console.log("Error: ", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});
