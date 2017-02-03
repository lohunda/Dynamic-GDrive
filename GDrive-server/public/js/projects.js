var projects = {
  init: function init() {
    projects.getRootFiles();
  },
  getRootFiles: function () {
    $.ajax({
      url: "/GDrive/getRootFiles",
      method: "get",
      success: function (res) {

        projects.loadingRootFiles(res.files);

        console.log(res);

      },
      error: function (res) {
        console.log(res);
      }
    })
  },
  loadingRootFiles:function(files){
      for (var key in files){
        var html=projects.singleFile(files[key]);
        $(".folder-container").append(html);
      }
  },
  singleFile:function(file){
    // var fileHtml = '<div class="panel panel-default folder-single col-md-3">' +
    //   '<div class="panel-body text-center">' +
    //   '<div class="folder-img-container">' ;
    // if(file.mimeType==="application/vnd.google-apps.folder")
    // {
    //   fileHtml +='<img src="/img/folder.png" class="folder-img">';
    // }else if(file.mimeType==="application/vnd.google-apps.document"){
    //   fileHtml +='<img src="/img/doc.png" class="folder-img">';
    // }else {
    //   fileHtml +='<img src="/img/normalfile.png" class="folder-img">';
    // }
    //
    // fileHtml += '</div>' +
    //   '<div class="col-md-12">'+file.name+'</div>' +
    //   '<div class="col-md-12"><span class="label label-default">important</span></div>' +
    //   '<div class="col-md-12">' +
    //   '<a class="btn btn-primary">view</a>' +
    //   '<a class="btn btn-primary">download</a>' +
    //   '</div>' +
    //   '</div></div>';

      return "";
  }
};

$(function () {
  projects.init();
});



