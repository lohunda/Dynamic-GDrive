var Sequelize = require('sequelize');

module.exports =function(){
  var todo = sequelize.define('todo', {
    uuid: {
      type: Sequelize.STRING,
      field: 'uuid'
    },
    uGuid: {
      type: Sequelize.STRING,
      field: 'uGuid'
    },
    oGuid: {
      type: Sequelize.STRING,
      field: 'oGuid'
    },
    desc:{
      type: Sequelize.STRING,
      field: 'desc'
    },
    isFinish:{
      type: Sequelize.BOOLEAN,
      field: 'isFinish'
    }
  }, {
    freezeTableName: true
  });
  return todo;
}

