var home = require($app.webApp.home);
var document = require($app.webApp.document);


/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/', home);
  app.use('/doc', document);

}
