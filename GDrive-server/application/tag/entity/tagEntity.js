

module.exports =function(sequelize){
  var tag = sequelize.define('tag', {
    uGuid: {
      type: Sequelize.STRING,
      field: 'uGuid'
    },
    oGuid: {
      type: Sequelize.STRING,
      field: 'oGuid'
    },
    tag:{
      type: Sequelize.STRING,
      field: 'tag'
    },
    parent:{
      type: Sequelize.STRING,
      field: 'parent'
    }
  }, {
    freezeTableName: true
  });
  return tag;
}

