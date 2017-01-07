var tag = require($app.tag.tag);


/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/tag', tag);


}
