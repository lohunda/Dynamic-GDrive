// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '800973480222-930hdptbttvj30h6lugsfl56ghu20af3.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive'];

var ROOT_FOLDER = '0B-3_gHZN67kwMHdWeG9rWGJRVGc';

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadDriveApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Drive API client library.
 */
function loadDriveApi() {
  gapi.client.load('drive', 'v2', retrieveFilesInFolder);
}

/**
       * Load Directory API client library. List users once client library
       * is loaded.
       */
      function loadDirectoryApi() {
        gapi.client.load('admin', 'directory_v1', listUsers);
      }

/**
 * Print files.
 */
function listAllFiles() {
  var request = gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    });

    request.execute(function(resp) {
      var files = resp.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          appendPre(file.name + ' (' + file.id + ')');
        }
      } else {
        appendPre('No files found.');
      }
    });
}

/**
 * Retrieve a list of files belonging to a folder.
 */
function retrieveFilesInFolder() {
  var request = gapi.client.drive.children.list({
    'folderId' : ROOT_FOLDER,
  });

    request.execute(function(resp) {
      var files = resp.items;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          getFile(files[i].id);
        }
      } else {
        appendPre('No files found.');
      }
    });
}

/**
 * Print a file's metadata.
 *
 * @param {String} fileId ID of the file to print metadata for.
 */
function getFile(fileId) {
  var request = gapi.client.drive.files.get({
    'fileId': fileId
  });
  request.execute(function(resp) {
    //appendPre(resp.title + ' (' + resp.mimeType + ')');
    console.log('Title: ' + resp.title);
    console.log('Description: ' + resp.description);
    console.log('MIME type: ' + resp.mimeType);
    var link;
    if (resp.mimeType && resp.mimeType.includes('document') && resp.title.includes('Dashboard')) {
      createContent(fileId);
    } else if (resp.mimeType && resp.mimeType.includes('folder')) {
      link = "https://drive.google.com/drive/u/0/folders/" + fileId;
      createLink(resp.title, link);
    } else {
      link = "https://drive.google.com/file/d/" + fileId;
      createLink(resp.title, link);
    }
  });
}

/**
 * Retrieve a list of comments.
 *
 * @param {String} fileId ID of the file to retrieve comments for.
 * @param {Function} callback Function to call when the request is complete.
 */
function retrieveComments(fileId, callback) {
  var request = gapi.client.drive.comments.list({
    'fileId': fileId
  });
  request.execute(callback);
}



/**
 * Append a pre element to the body containing the given message
 * as its text node.
 * <li><a href="#">Item 2</a></li>
 * @param {string} message Text to be placed in pre element.
 */
function createLink(title, link) {
  var pre = document.getElementById('nav-mobile');
  var li = document.createElement("li");
  var h1 = document.createElement("A");
  var att = document.createAttribute("href");
  att.value = link;
  h1.setAttributeNode(att);
  var t = document.createTextNode(title);
  h1.appendChild(t);
  li.appendChild(h1);
  pre.appendChild(li);
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 * @param {string} message Text to be placed in pre element.
 */
function createContent(fileId) {
  var content = document.getElementById('content');

  var request = gapi.client.drive.files.export({
    'fileId': fileId,
    'mimeType': "text/html"
  });

  request.then(function(resp) {
    console.log(resp.body);
    $(content).html($(resp.body));
  });
}
