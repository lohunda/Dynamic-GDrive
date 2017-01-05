var fs = require("fs");


const moduleLoader = {
  applicationLoader(app) {

    let files = fs.readdirSync($app.rootPath.application);

    for (let key in files) {
      moduleLoader.baseLoader($app.rootPath.application + "/" + files[key] + "/", app);
    }

  },
  componentsLoader: function (app) {

  }, baseLoader: function (filePath, app) {
    try {
      var cfg = JSON.parse(fs.readFileSync(filePath + "cfg.json", 'utf-8'));

      global.$app[cfg.moduleName] = {};
      for (var key in cfg.loader) {
        global.$app[cfg.moduleName][key] = filePath + cfg.loader[key];
      }

      if (cfg.app) {
        require(filePath + cfg["app"])(app);
      }

    } catch (err) {
      console.error(err);
    }

  },
  runModuleLoader: function (app) {

    this.applicationLoader(app);
    this.componentsLoader(app);
  }

}


/**
 * main loader
 */
module.exports = function (app) {
  moduleLoader.runModuleLoader(app);
}
