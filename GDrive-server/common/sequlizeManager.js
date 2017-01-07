var Sequelize = require('sequelize');


module.exports= function sequlize() {
  var sequelize = new Sequelize('mysql://root@localhost:3306/GDrive');
  return sequelize;
}

