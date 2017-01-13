var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  var method = request.method;

  //readFile - needs the ABSOLUTE PATHFILE forthe homepage - 'index.html'
  fs.readFile(archive.paths.homepage, function(err, data) {
    //res.writeHead(200, {'Content-Type': 'text/html', 'Content-length': data.length});
    if (err) {
      console.log('request-handler.js: could not render index.html to screen');
    } else {
      res.end(data);
    }
  });
  
  if (method === 'GET') {

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
  }

  // res.end(archive.paths.list);
};

