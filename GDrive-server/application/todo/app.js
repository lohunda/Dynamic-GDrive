var todo = require($app.todo.todo);



/**
 * express setting
 * @param app
 */
module.exports = function (app,sequelize) {

  app.use('/todo', todo);



}
