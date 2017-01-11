var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  fs.readFile('./public/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html', 'Content-length': data.length});
    res.write(data, function(err) {
      if (err) {
        console.log('request-handler.js: could not render index.html to screen');
      } else {
        console.log('request-handler.js: render successful');
        // console.log(res);
        // console.log(data);
        res.end();
      }
    });
  });
  
  // res.end(archive.paths.list);
};

