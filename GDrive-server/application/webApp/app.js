var home = require($app.webApp.home);
var document = require($app.webApp.document);
var GDrive = require($app.webApp.GDrive);

/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/', home);
  app.use('/doc', document);
  app.use('/GDrive',GDrive)

}
