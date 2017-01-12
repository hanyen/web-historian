// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//use fs to read the site.txt 
//check if the user-inputted website with status = 'done' is found in the 'sites.txt' file
  //yes - 
    //check the archive folder
    //fs.readFile (ebay)
      //render or show the contents
  //no - status = 'unfetched'
    //change status to 'fetched'
    //workers/htmlfetcher.js to fetch the website
    //(modularize - use helpers/archive-helpers.js) to download the html file
      // inside the achive-helpers method callback, write HTML to storage ('/archives')
      // change status to 'done'

