var ProjectDetail = {
  currPage:null,
  init: function init() {
    var id = ProjectDetail.getUrlParameter("id");
    ProjectDetail.getProjectFiles(id);
    ProjectDetail.chartBotManager();
    ProjectDetail.updateBar();
  },
  updateBar: function updateBar(){

    var barQueue = JSON.parse(localStorage.getItem('bar-que'));

    var barHTML = '<a href="/GDrive/projects">Project</a>';

    if(barQueue) {

      for(var key = barQueue.length - 1; key >= 0; key--){
        var obj = barQueue[key];
        if(location.href.indexOf(obj.url) > -1){
          break;
        }else{
          barQueue.pop();
        }
      }

      localStorage.setItem('bar-que', JSON.stringify(barQueue));

      for (var key = 0; key < barQueue.length; key++) {
        var obj = barQueue[key];
        barHTML += ' -> <a href="' + obj.url + '">' + obj.name + '</a>';
      }
    }

    $("#proj-bar").html(barHTML);

  },
  getUrlParameter: function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  },
  getProjectFiles: function (id) {
    $.ajax({
      url: "/GDrive/getFilesByFolder?id=" + id,
      method: "get",
      success: function (res) {

        ProjectDetail.loadingRootFiles(res.files);

        console.log(res);

      },
      error: function (res) {
        console.log(res);
      }
    })
  },
  loadingRootFiles: function (files) {
    for (var key in files) {
      ProjectDetail.singleFile(files[key]);
    }
    ProjectDetail.projectClickBinding();
    ProjectDetail.fileClickBinding();
  },
  singleFile: function (file) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      var projectItem = '<div class="col-md-4 project-open-link" bind-data="' + file.id + '">' +
        '<div class="card single-project">' +
        '<div class="card-block project-folder-area">' +
        '<div class="col-md-4 folder-icon"><img  src="/img/foldericon.png" /></div>' +
        '<div class="col-md-8"><h4 class="card-title folder-title">' + file.name + '</h4></div>' +
        '</div>' +
        '</div>' +
        '</div>';
      $(".folder-container").append(projectItem);
    } else if (file.mimeType ===  "application/vnd.google-apps.document") {
      var fileItem= '<div class="file-item col-md-2 text-center" bind-data="' + file.id + '">' +
        '<figure>' +
        '<img class="file-img" src="/img/file_short01.png" >' +
        '<figcaption >' + file.name + ' </figcaption>' +
        '</figure>' +
        '</div>';

      $(".file-container").append(fileItem);
    } else {
      return "";
    }
  },
  projectClickBinding: function probind() {
    $(".project-open-link").click(function () {
      var id = $(this).attr("bind-data");
      var barQueue = JSON.parse(localStorage.getItem('bar-que'));

      var currName = $(this).find(".folder-title").html();

      var barObj = {
        name: currName,
        url: '/GDrive/projectDetail?id=' + id
      }

      if(barQueue){
        barQueue.push(barObj);
        localStorage.setItem('bar-que', JSON.stringify(barQueue));
      }else{
        localStorage.setItem('bar-que', JSON.stringify([barObj]));
      }
      location.href = "/GDrive/projectDetail?id=" + id;
    });
  },
  fileClickBinding:function fileBind(){
    $(".file-item").click(function(){
      var id = $(this).attr("bind-data");
      var barQueue = JSON.parse(localStorage.getItem('bar-que'));
      var currName = $(this).find("figcaption").html();

      var barObj = {
        name: currName,
        url: '/GDrive/fileContent?id=' + id
      }

      if(barQueue){
        barQueue.push(barObj);
        localStorage.setItem('bar-que', JSON.stringify(barQueue));
      }else{
        localStorage.setItem('bar-que', JSON.stringify([barObj]));
      }
      location.href = "/GDrive/fileContent?id=" + id;
    });
  },
  chartBotManager:function(){

    $('#addFolder').on('click', function () {


      var newFolderName = $('#folder-name-text').val();

      if(!newFolderName) return false;

      var sendData = {
        folderId: ProjectDetail.getUrlParameter("id"),
        folderName: newFolderName
      };
      $.ajax({
        url: '/GDrive/new-folder',
        data: sendData,
        type: 'post',
        success: function (res) {
          alert('new folder success');
          location.reload();
        },
        error: function (err) {
          alert('new folder error');
          console.error(err);
        }
      });

    });

    $("#fab-btn").click(function(){
      $(".member-chart").show();
    });

    $(".mask").click(function(){
      $(".member-chart").hide();
    });

    $("#fab-btn-mask").click(function(){
      $(".member-chart").hide();
    });

    $("#upload-file-btn").click(function(){
      $("#input-file").click();
    });

    $('#input-file').change(function () {
      var formData = new FormData();
      var files = $('#input-file')[0].files;
      if (files.length == 0) {
        alert('not files are selected.')
        return;
      }
      for (var key in files) {
        formData.append('file' + key, files[key]);
      }
      var id = ProjectDetail.getUrlParameter("id");
      formData.append("folderId",id);
      $.ajax({
        url: '/GDrive/upload',
        data: formData,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (res) {
          alert('upload success');
          location.reload();
        },
        error: function (err) {
          alert('upload error');
          console.error(err);
        }
      });
    })
  },
};

$(function () {
  ProjectDetail.init();
});



