
var Sequelize = require('sequelize');

module.exports =function(){
  var tag = sequelize.define('tag', {
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

