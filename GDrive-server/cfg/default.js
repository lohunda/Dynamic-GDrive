

var cfg = {

  util: {
    absPath: function (rootPath) {
      return $app.projectPath + "/" + rootPath ;
    }
  },

  /***
   * initial global setting
   */
  init: function initSetting(dir) {

    global.$app = {};
    $app.projectPath=dir;

    /**
     * setting the rootPath
     * @type {{application: string, filter: string}}
     */
    $app.rootPath = {
      common: cfg.util.absPath("common"),
      util: cfg.util.absPath("util"),
      //filter: cfg.util.absPath("filter"),
      application: cfg.util.absPath("application"),
    };
  },
  cfg: function cfg() {

    /**
     * looping loading path of main files in folders
     */
    for (var key in this.paths) {
      this.paths[key]();
    }
  },
  paths: {
    common: function () {
      $app.common = {};
      $app.common.moduleLoader = $app.rootPath.common+ "/moduleLoader";
      $app.common.mongodbConnection = $app.rootPath.common+ "/mongodbConnection";
    }
  }
}

/***
 *
 * @param dir root dir
 */
module.exports = function (dir) {

  cfg.init(dir);
  cfg.cfg();

}








