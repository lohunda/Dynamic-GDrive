var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


/***
 *
 *   parameter : email, password
 *   return : success or error, error code
 *
 */
router.post('/register',function(req,res){

});


/***
 *
 * parameter : email ,password
 * return : login success or "user name or password error"
 */
router.post('/login',function(req,res){


});

module.exports = router;
