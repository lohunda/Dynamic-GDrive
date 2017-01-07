var todo = require($app.todo.todo);

var Sequelize = require('sequelize');

/**
 * express setting
 * @param app
 */
module.exports = function (app,sequelize) {

  app.use('/todo', todo);



}
