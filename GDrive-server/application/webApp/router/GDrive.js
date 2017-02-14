var express = require('express');
var router = express.Router();





router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

router.get('/projects', function(req, res) {
  res.render('projects');
});

router.get('/projectDetail', function(req, res) {
  res.render('projectDetail');
});

router.get('/fileContent', function(req, res) {
  res.render('fileContent');
});

router.get('/metrics', function(req, res) {
  res.render('metrics');
});

router.get('/todo', function(req, res) {
  res.render('todo');
});

router.get('/tags', function(req, res) {
  res.render('tags');
});

router.get('/todo', function(req, res) {
  res.render('todo');
});









module.exports = router;
