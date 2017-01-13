var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  console.log('Asset is: ', archive.paths.siteAssets + asset);
  var encoding = {encoding: 'utf8'};
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, data) {
    if (err) {
      // file doesn't exist in /web folder (siteAsset), so check archivedSites instead
      fs.readFile (archive.paths.archivedSites + asset, encoding, function(err, data) {
        if (err) {
          //file doesn't exist in archive folder (archivedSites)!
          callback ? callback() : exports.send404(res);
        } else {
          //send back the asset in /archives folder (archivedSites)
          exports.sendResponse(res, data);
        }
      });
    } else {
      //send back the asset in /web folder (siteAsset)
      exports.sendResponse(res, data);
    }
  });
};

exports.sendResponse = function(response, obj, status) {
  console.log('i am in exports.sendResponse');
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(obj);
}

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page not found', 404);
};


// As you progress, keep thinking about what helper functions you can put here!
