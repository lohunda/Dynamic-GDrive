var todo = require($app.todo.todo);



/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/todo', todo);


}
