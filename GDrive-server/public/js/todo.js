var todo = {
  init: function init() {
    todo.add();
  },
  add: function () {
    $.ajax({
      url: "/todo/add",
      method: "post",
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
  todo.init();
});
