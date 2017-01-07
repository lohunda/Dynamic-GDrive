var todoEntity = require($app.todo.todoEntity)();


var self = {
  add: function (param, callback) {
    todoEntity.sync({force: false}).then(function () {
      todoEntity.create(param);
      callback();
    });
  },
  findByuGuid: function (param, callback) {
    todoEntity.sync({force: false}).then(function () {
      var result=todoEntity.findAll({
        where: param
      }).then(function(err,result){
        callback();
      });


    });
  },


}


module.exports = self;
