var express = require('express');
var fs = require('fs');
var uuid = require('node-uuid');
var path = require('path');
var async = require("async");
var router = express.Router();

var authorize = require($app.GDrive.authorize);
var api = require($app.GDrive.driveService);

/* GET users listing. */
router.get('/', function (req, res) {
  res.send("something");
});

router.get('/getRootFiles', function (req, res) {
  authorize(function (auth) {
    api.getRoot(auth, function (err, result) {
      if (err) {
        res.send({code: 100, msg: "get root file error"});
        return
      }

      res.send(result);
    });
  });
});

router.get('/getFilesByFolder', function (req, res) {
  authorize(function (auth) {
    api.getFilesByFolder(auth, req.query.id, function (err, result) {
      if (err) {
        res.send({code: 100, msg: "get root file error"});
        return
      }
      res.send(result);
    });
  });
});

router.post('/delete', function (req, res) {
  authorize(function (auth) {
    api.deleteFile(auth, req.body.id, function (err, result) {
      if (err) {
        res.send({code: 100, msg: "delete file error"});
        return
      }
      res.send(result);
    });
  });
});

// new-folder
router.post('/new-folder', function (req, res) {
  authorize(function (auth) {
    api.newFolder(auth, req.body, function (err, result) {
      if (err) {
        res.send({code: 100, msg: "new folder error"});
        return
      }
      res.send(result);
    });
  });
});

router.post('/upload', function (req, res) {
  if (!req.files) {
    res.send({code: 100, msg: "No files were uploaded."});
    return;
  }

  async.eachSeries(req.files, function (file, callback) {
    var filePath = 'uploads/' + uuid.v4() + path.extname(file.name);
    file.mv(filePath, function (err) {
      if (err) {
        callback(err);
        return;
      }
      authorize(function (auth) {
        api.createFile(auth, file, filePath,  req.body.folderId, function (err, result) {
          if (err) {
            callback(err, result);
            return
          }
          callback(null, result);
        });
      });
    });
  }, function (err, result) {
    if (err) {
      res.send({code: 100, msg: "upload file error"});
      return
    }
    res.send(result);
  });
});

router.get('/getContent', function (req, res) {
  authorize(function (auth) {
    api.exportFile(auth,req.query.id, function (err, result) {
      if (err) {
        res.send({code: 100, msg: "get file content error"});
        return;
      }

      res.send(result);
    });
  });
});


module.exports = router;
