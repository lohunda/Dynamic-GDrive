var google = require('googleapis');
var fs = require('fs');


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
  }, function (err, response) {
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
  }, function (err, response) {
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
module.exports.getRoot = function getRoot(auth, callback) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 1000,
    fields: "nextPageToken, files",
    q: "'root' in parents"
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);

    }
    callback(err, response);
  });
}


module.exports.getFilesByFolder = function getRoot(auth, folderId, callback) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 1000,
    fields: "nextPageToken, files",
    q: "'" + folderId + "' in parents"
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);

    }
    callback(err, response);
  });
}


module.exports.exportFile =function exportFile(auth,fileId,callback){
  var service = google.drive('v3');

  service.files.export({
    auth: auth,
    fileId: fileId,
    mimeType: 'text/plain'
  },function(err, response){
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    callback(err,response);
  });

}


module.exports.createFile = function getRoot(auth, file, path, folderId, callback) {
  var service = google.drive('v3');
  service.files.create({
    auth: auth,
    resource: {
      name: file.name,
      parents: [ folderId ],
      mimeType: 'application/vnd.google-apps.document'
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(path)
    }
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('upload successful');
    callback(err, response);
  });

}


module.exports.createComment = function getRoot(auth, params, callback) {
  var service = google.drive('v3');
  service.comments.create({
    auth: auth,
    fileId: params.fileId,
    resource: {
      "content": params.content,
    },
    fields: "id, content"
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('create comment successful');
    callback(err, response);
  });

}

module.exports.getComments = function getRoot(auth, params, callback) {
  var service = google.drive('v3');
  service.comments.list({
    auth: auth,
    fileId: params.fileId,
    fields: "kind, nextPageToken, comments"
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('create comment successful');
    callback(err, response);
  });

}

// newFolder
module.exports.newFolder = function getRoot(auth, params, callback) {
  var service = google.drive('v3');
  var fileMetadata = {
    'name' : params.folderName,
    parents: [ params.folderId ],
    'mimeType' : 'application/vnd.google-apps.folder'
  };
  service.files.create({
    auth: auth,
    resource: fileMetadata,
    fields: 'id'
  }, function(err, file) {
    if(err) {
      console.log(err);
      callback(err, file);
    } else {
      console.log('Folder Id: ', file.id);
      callback(err, file);
    }
  });
}


module.exports.deleteFile = function getRoot(authClient, fileId, callback) {
  // var google = require('googleapis');
  // var bigquery = google.bigquery('v2');

  // service.files.delete({
  //   auth: auth,
  // }, function (err, response) {
  //   if (err) {
  //     console.log('The API returned an error: ' + err);
  //     return;
  //   }
  //   console.log('upload successful');
  //   callback(err, response);
  // });

  // google.auth.getApplicationDefault(function (err, authClient, projectId) {
  //   if (err) {
  //     console.log('Authentication failed because of ', err);
  //     return;
  //   }
  //   if (authClient.createScopedRequired && authClient.createScopedRequired()) {
  //     var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
  //     authClient = authClient.createScoped(scopes);
  //   }
  //
  //   var request = {
  //     // projectId: projectId,
  //     datasetId: 'fileId',
  //
  //     auth: auth
  //   };
  //
  //   bigquery.datasets.delete(request, function (err, result, callback) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //       callback(err, response);
  //     }
  //   });
  // });
}

//author(listFiles);
