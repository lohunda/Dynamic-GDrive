var rest = require($app.project.rest);


var inParameter = {app: "app", sequlize: "sequlize"};

/**
 * express setting
 * @param app
 */
module.exports = function (app) {

  app.use('/project', rest);


}
