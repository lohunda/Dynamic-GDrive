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
    projects.projectClickBinding();
  },
  singleFile:function(file){
    if(file.mimeType==="application/vnd.google-apps.folder"){
      var projectItem='<div class="col-md-4 project-open-link" bind-data="'+file.id+'">'+
        '<div class="card single-project">'+
        '<div class="card-block project-folder-area">'+
       '<div class="col-md-4 folder-icon"><img  src="/img/foldericon.png" /></div>'+
        '<div class="col-md-8"><h4 class="card-title folder-title">'+file.name+'</h4></div>'+
      '</div>'+
      '</div>'+
      '</div>';
      return projectItem;

    }else {
      return "";
    }


  },
  projectClickBinding:function probind(){
    $(".project-open-link").click(function(){
       var id=$(this).attr("bind-data");
      location.href="/GDrive/projectDetail?id="+id;
    });
  }
};

$(function () {
  projects.init();
});



