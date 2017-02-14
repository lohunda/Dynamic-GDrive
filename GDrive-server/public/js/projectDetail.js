var ProjectDetail = {
  init: function init() {

    var id = ProjectDetail.getUrlParameter("id");

    ProjectDetail.getProjectFiles(id);

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
    } else if (file.mimeType === "text/plain") {
      var fileItem= '<div class="file-item col-md-2 text-center">' +
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
      location.href = "/GDrive/projectDetail?id=" + id;
    });
  }
};

$(function () {
  ProjectDetail.init();
});



