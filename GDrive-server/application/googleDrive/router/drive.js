var express = require('express');
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
        res.send({code:100,msg:"get root file error"});
        return
      }

      res.send(result);
    });
  });
});


module.exports = router;
