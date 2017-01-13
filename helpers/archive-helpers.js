var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  homepage: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  var urls;
  //readFile(filepath/, [encoding - 'utf8' is default], anonymous func(err, data){})
  fs.readFile(exports.paths.list, function(err, data) {

    urls = data.toString().split('\n');
    //if(!err) --> pass the result of var - 'urls'
    callback(err, urls);
  });
  
};

exports.isUrlInList = function(url, callback) {
  var urls;

  fs.readFile(exports.paths.list, function( err, data) {
    urls = data;//.toString().split('\n');
    //if(!err) --> pass the result of var - 'urls'
    if (urls.indexOf(url) !== -1) {
      callback(err, true);
    } else {
      callback(err, false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  //fs.writeFile(fileName, data, [encoding], [callback])
  fs.writeFile(exports.paths.list, url + '/n', 'utf8', function( err, data) {
    callback(err, data);
  });
};

//check this path: '../archives/sites'
exports.isUrlArchived = function(url, callback) {
  //process.cwd() method returns the current working directory
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    // console.log(files);
    if (files.indexOf(url) !== -1) {
      callback(err, true);
      return true;
    } else {
      callback(err, false);
      return false;
    }
  });
};

exports.downloadUrls = function(urlArray) {
  // var urls; //[''] - commented out 'readListOfUrls' in test.js (line 80)
  //should take an array of urls to download
  console.log('urlArray: ', urlArray);
              //archives/sites.txt
  exports.readListOfUrls( function(err, urls) {
    if (err) {
      console.log('archive-helpers: downloadUrls fails');
    } else {
      // console.log('data: ', JSON.parse(data));
      //urls = data.toString().split('\n'); //we get an array of urls in sites.txt
      console.log('urls', urls);
      //for each element in the urlArray
      for (var i = 0; i < urls.length; i++) {
        //Pass urls[i] into isUrlArchived (will return boolean) to check if the element has been archived before
        var isArchived = exports.isUrlArchived(urls[i], () => {});
        console.log('urls[i]: ', urls[i]);
        console.log('isArchived: ', isArchived);
        if (!isArchived) {
          //save it inside exports.path.archivedSites folder
          fs.open(exports.paths.archivedSites + '/' + urls[i], 'wx', function(err, fd) {
            if (err) {
              console.log('archive-helpers.js: Fail to create a new file');
            } else {
              fs.close(fd, function (err) {
                if (err) {
                  console.log('archive-helpers.js: Fail to close new file');
                }
              });
            }
          }); //wx prevents overwriting existing file
          //name it with the element name (i.e. url - www.example.com, www.google.com)
        } else {
          //do nothing
        }
      }
      //if isUrlArchived returns false
        //go to the website of the given url
        //download the website source code
      //else
        //do nothing
    }
              
  });
};

// exports.paths = {
//   siteAssets: path.join(__dirname, '../web/public'),
//   archivedSites: path.join(__dirname, '../archives/sites'),
//   list: path.join(__dirname, '../archives/sites.txt'),
//   homepage: path.join(__dirname, '../web/public/index.html')
// };