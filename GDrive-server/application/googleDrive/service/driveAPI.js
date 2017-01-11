var google = require('googleapis');


/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    //pageSize: 10,
    //fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
}


function get(auth) {
  var service = google.drive('v3');
  service.about.get({
    auth: auth,
    fields: "user"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}


/**
 * get the root folder and file
 * @param auth
 */
module.exports.getRoot = function getRoot(auth,callback){
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 1000,
    fields: "nextPageToken, files",
    q:"'root' in parents"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    callback(err,response);
  });
}



module.exports.getFilesByFolder = function getRoot(auth,folderId,callback){
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 1000,
    fields: "nextPageToken, files",
    q:"'"+folderId+"' in parents"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    callback(err,response);
  });
}




//author(listFiles);
