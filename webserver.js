var http = require("http")

http.createServer(
  function (request, response) {
    response.writeHead(
      200,
      {'Content-Type': 'text/html'}
    );
    response.end('<html><title>NodeJS</title><body>Hello, NodeJS!</body></html>');
  }
).listen(8080);

console.log('Web Server running on port 8080');
