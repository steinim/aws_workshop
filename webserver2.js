var http = require("http")

http.createServer(
  function (request, response) {
    if (request.url == "/mystyle.css") {
      response.writeHead(
        200,
        {'Content-Type': 'text/css'});
      response.end("p { color: blue }");
    } else {
      response.writeHead(
      200,
      {'Content-Type': 'text/html'}
      );
      if (request.url == "/index.html") {
        response.end("<html>" + 
                     "<head>" +
                     "<link rel='stylesheet' type='text/css' href='mystyle.css'>" +
                     "</head>" +
                     "<title>NodeJS</title>" +
                     "<body><p>Content of index.html here...</p></body>" +
                     "</html>");
      } else {
        response.end('<html><title>NodeJS</title><body>Hello, Nodejs!</body></html>');
      }

    }
  }
).listen(8080);

console.log('Web Server running on port 8080');
