var author = require('../service/authorize');
var google = require('googleapis');


global.$app = {
  GDrive: {
    clientSecret: "../client_secret.json"
  }
};

var self = {
  init: function init() {
    author(self.listFiles);
  },
  listFiles: function listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
      auth: auth,
      pageSize: 10,
      fields: "nextPageToken, files(id, name)"
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
}


self.init();
