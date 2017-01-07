var drive = require($app.GDrive.drive);


/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/GDrive', drive);


}
