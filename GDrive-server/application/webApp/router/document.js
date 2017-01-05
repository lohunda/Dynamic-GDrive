var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', function(req, res) {
  res.render('doc/api');
});




module.exports = router;
