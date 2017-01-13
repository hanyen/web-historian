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
var helpers = require('html-helpers');

//create an 'action' object literal to hold the GET and POST functions
var action = {
  'GET': function (request, response) {

  },
  'POST': function (request, response) {

  }
}

exports.handleRequest = function (req, res) {
  //set handler to the action object's corresponding server request key (GET or PUT)
  var handler = action[req.method]; 
  if (handler) { 
    //execute the GET or PUT methods in the action object literal
    handler(req, res); 
  } else {
    //use the http helper send404 method //TODO
    helpers.send404(response);
  }
};







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
  fs.readFile(archive.paths.homepage, function(err, data) {
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
      archive.isUrlInList (url, function (err, exists) {
        console.log('I am inside archive.isUrlInlist');
        console.log('Exist?', exists);
        if (!err) {
          //if exists === true
          if (exists === true) {
            //archive.isUrlArchived: get the webpage from storage 
            
          } else {
            //archive.addUrlToList: write url to sites.txt 
            console.log(url + ' does not exist in sites.txt, so it will be added');
            //this method 'OVERWRITES' previous url in sites.txt (length === 1)
            archive.addUrlToList(url, function (err) {
              if (!err) {
                //render public/loading.html
                fs.readFile(archive.paths.loadingPage, function(err, data) {
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
