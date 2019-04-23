var http = require("http");
var fs = require("fs");
var runServer = function(text){
   http.createServer(function (request, response) {
      // Send the HTTP header 
      // HTTP Status: 200 : OK
      // Content Type: text/plain
      response.writeHead(200, {'Content-Type': 'text/html'});
      
      // Send the response body as "Hello World"
      response.end(text);
   }).listen(8081);
}

// Console will print the message

// syncronis file reading
//var data = fs.readFileSync('input.txt');
//console.log(data.toString());

fs.readFile('input.txt', function (err, data) {
   if (err) return console.error(err);
   {
      runServer('<h2>' + data + " asynhronise!</h2>");
      console.log('Server running at http://127.0.0.1:8081/');
      //console.log(data.toString() + " asynhronise!");
      console.log("Program Ended");
   }
});
