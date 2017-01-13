// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//use fs to read the site.txt 
//need to keep track of the array length in 'sites.txt'
//check if the user-inputted website is found in the 'sites.txt' file
  //yes - 
    //check the archive folder
    //fs.readFile (ebay)
      //render or show the contents
  //no - status = 'unfetched'
    //change status to 'fetched'
    
var archiveHelper = require('../helpers/archive-helpers');
    //workers/htmlfetcher.js to fetch the website
    //(modularize - use helpers/archive-helpers.js) to download the html file
      // inside the achive-helpers method callback, write HTML to storage ('/archives/www.google.com')
      // change status to 'done'


  //how does htmlfetch know that it needs to fetch 'amazon.com', which just got inputted and entered by the client-user
//['example1.com', 'example2.com']
//needToProcess = ['amazon.com']
// call archiveHelper.readListOfUrls()


 //USE CHRON worker will check '.txt'