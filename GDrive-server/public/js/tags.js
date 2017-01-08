var tags = {
  init: function init() {
    todo.add();
  },
  add: function () {
    $.ajax({
      url: "/tags/add",
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
  tags.init();
});
