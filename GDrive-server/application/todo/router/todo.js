var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var todoDao=require($app.todo.todoDao);

/* GET users listing. */
router.get('/', function (req, res) {
  res.send("something");
});

router.get('/add', function (req, res) {

  var sendin = {uuid: uuid.v1(), uGuid: '1', oGuid: 'file1', desc: 'test', isFinish: false};

  todoDao.add(sendin,function(){
    res.send("success");
  });

});

router.get('/markFinish', function (req, res) {

  res.send("something");
});

router.get('/unmarkFinish', function (req, res) {

  res.send("something");
});

router.get('/delete', function (req, res) {

  res.send("something");
});

router.get('/get', function (req, res) {
  var sendin = { uGuid: '1'};

  todoDao.findByuGuid(sendin,function(){
    res.send("success");
  });
});

module.exports = router;
