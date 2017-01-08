var dashboard = {
  init: function init() {
    dashboard.getRootFiles();
  },
  getRootFiles: function () {
    $.ajax({
      url: "/GDrive/getRootFiles",
      method: "get",
      success: function (res) {
        debugger;
      },
      error: function (res) {

      }
    })
  }
};

$(function () {
  dashboard.init();
});
