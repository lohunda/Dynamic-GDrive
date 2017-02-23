var projects = {
  init: function init() {
    projects.getRootFiles();

    localStorage.removeItem('bar-que');

    $("#tag-img").on('click', function () {
      debugger;
      if($(this).attr('src') == "/img/tag button on.png"){
        $(this).attr('src', "/img/tag button off.png");
      }else{
        $(this).attr('src', "/img/tag button on.png");
      }
    });


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

      var complete=Math.floor(Math.random() * 20);
      var progress=Math.floor(Math.random() * 20);
      var projectItem='<div class="col-md-6">'+
        '<div class="card single-project">'+
        '<div class="card-block">'+
        '<h4 class="card-title">'+file.name+'</h4>'+
        '<h6 class="project-open-link" bind-data="'+file.id+'">open this folder <i class="fa fa-long-arrow-right" aria-hidden="true"></i></h6>'+

        '<div class="project-item-line"></div>'+

        '<div class="col-md-12 project-information">'+
        '<div class="col-md-6 text-center">'+
        '<div class="progress-area">'+
        '<h3>'+progress+'</h3>'+
        '<div>in progress</div>'+
       '</div>'+
        '</div>'+

        '<div class="col-md-6 text-center project-complete">'+
        '<div class="progress-area">'+
        '<h3>'+complete+'</h3>'+
        '<div>complete</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
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



