var rest = require($app.userMgt.rest);


var inParameter = {app: "app", sequlize: "sequlize"};

/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/userMgt', rest);


}
