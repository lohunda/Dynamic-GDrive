var dashboard = {
  init: function init() {
    dashboard.getRootFiles();
  },
  getRootFiles: function () {
    $.ajax({
      url: "/GDrive/getRootFiles",
      method: "get",
      success: function (res) {

        console.log(res);

      },
      error: function (res) {
        console.log(res);
      }
    })
  }
};

$(function () {
  dashboard.init();
});
