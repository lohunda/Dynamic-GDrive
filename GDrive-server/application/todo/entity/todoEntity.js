

module.exports =function(sequelize){
  var todo = sequelize.define('todo', {
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

