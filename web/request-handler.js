var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var path = require('path');
var helpers = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!
var fs = require('fs');


exports.handleRequest = function (request, respond) {
  // var method = request.method;
  var path = url.parse(request.url).pathname;
  console.log('path', path);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  if (path !== '/') {
    console.log(' i am here');
    statusCode = 404;
    respond.writeHead(statusCode, headers);
    respond.end('404 File not found');
  }

  //readFile - needs the ABSOLUTE PATHFILE forthe homepage - 'index.html'
  fs.readFile(helpers.paths.homepage, function(err, data) {
    if (err) {
      console.log('request-handler.js: could not render index.html to screen');
    } else {
      respond.end(data);
    }
  });
  

  if (request.method === 'POST') {
    var body = '';
    statusCode = 201;
    request.on('data', function (data) {
      body += data;
      var url = JSON.stringify(body.substr(4));
      console.log('url: ' + url);
      //isUrlInList: find out if url is in the sites.txt
                        //url, callback(err, true/false)
      helpers.isUrlInList (url, function (err, exists) {
        console.log('I am inside helpers.isUrlInlist');
        console.log('Exist?', exists);
        if (!err) {
          //if exists === true
          if (exists === true) {
            //helpers.isUrlArchived: get the webpage from storage 
            
          } else {
            //helpers.addUrlToList: write url to sites.txt 
            console.log(url + ' does not exist in sites.txt, so it will be added');
            //this method 'OVERWRITES' previous url in sites.txt (length === 1)
            helpers.addUrlToList(url, function (err) {
              if (!err) {
                //render public/loading.html
                fs.readFile(helpers.paths.loadingPage, function(err, data) {
                  if (!err) {
                    respond.end(data);
                  } else {
                    console.log('request-handler.js: could not render index.html to screen');
                  }
                });
              } else {
                done(error);
              }
            });
          }

        } else {
          done(err);
        }
      });

    });

  }
  
};
