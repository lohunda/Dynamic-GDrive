var express = require('express');
var router = express.Router();





router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

router.get('/metrics', function(req, res) {
  res.render('metrics');
});

router.get('/todo', function(req, res) {
  res.render('todo');
});









module.exports = router;
