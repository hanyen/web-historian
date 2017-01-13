var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

//declaring the ip and port number to use
var port = 8080;
var ip = '127.0.0.1';

// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
// =================================================================
// Any node web server application will at some point have to create 
// a web server object. This is done by using createServer.

// The Server object returned by createServer is an EventEmitter, 
// and what we have here is just shorthand for creating a server object 
// and then adding the listener later.

// When an HTTP request hits the server, node calls the request handler 
// function with a few handy objects for dealing with the transaction, 
// request and response. 
var server = http.createServer(handler.handleRequest /*magic happens here*/);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip); //listening on the ip and port number
  console.log('Listening on http://' + ip + ':' + port);
}
