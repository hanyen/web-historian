var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!
var fs = require('fs');



exports.handleRequest = function (req, res) {
  // var method = request.method;
  var path = url.parse(req.url).pathname;
  console.log('path', path);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  if (path !== '/') {
    console.log(' i am here');
    statusCode = 404;
    res.writeHead(statusCode, headers);
    res.end('404 File not found');
  }

  //readFile - needs the ABSOLUTE PATHFILE forthe homepage - 'index.html'
  fs.readFile(archive.paths.homepage, function(err, data) {
    //res.writeHead(200, {'Content-Type': 'text/html', 'Content-length': data.length});
    if (err) {
      console.log('request-handler.js: could not render index.html to screen');
    } else {
      res.end(data);
    }
  });
  

  if (req.method === 'POST') {
    console.log('i am inside post');
    var body = '';
    statusCode = 201;
    req.on('data', function (data) {
      body += data;
      console.log('url: ' + JSON.stringify(body.substr(4)));
    });

    // req.on('end', function (data) {
    //   body = JSON.parse(data);
    // });

    //res.writeHead(statusCode, headers);
  //  res.end(JSON.stringify(body));

  }
  /*if (method === 'GET') {

  } else if (method === 'POST') {
    if (req.url === '/index.html') {
      //take FORM input from homepage
      //check if URL is archived in '.txt' file
      if (archive.isUrlArchived()) {
        //return the contents of the website
          //this should execute the html source-code
      } else {
        //we need to wake up worker to fetch for file from internet
        //archive.addUrlToList() -- adding to '.txt' file
         
      }
    }
  }*/

  // res.end(archive.paths.list);
};
