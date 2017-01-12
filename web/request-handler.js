var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  //readFile - needs the ABSOLUTE PATHFILE for 'index.html'
  fs.readFile('/Users/student/Desktop/hrsf53-web-historian/web/public/index.html', function(err, data) {
    //res.writeHead(200, {'Content-Type': 'text/html', 'Content-length': data.length});
    if (err) {
      console.log('request-handler.js: could not render index.html to screen');
    } else {
      res.end(data);
    }
    
  });
  
  // res.end(archive.paths.list);
};

