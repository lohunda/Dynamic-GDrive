var dashboard = {
  init: function init() {
    dashboard.getRootFiles();

    $('#input-file').change(function () {
      var formData = new FormData();
      if (this.files.length == 0) {
        return;
      }
      for (var key in this.files) {
        formData.append('file' + key, this.files[key]);
      }
      $.ajax({
        url: '/GDrive/upload',
        data: formData,
        contentType: false,
        processData: false,
        type: 'post',
        success: function (res) {
          alert('upload success');
        },
        error: function (err) {
          alert('upload error');
          console.error(err);
        }
      });
    })


  },
  getRootFiles: function () {
    $.ajax({
      url: "/GDrive/getRootFiles",
      method: "get",
      success: function (res) {

        dashboard.loadingRootFiles(res.files);

        // $('.delete-file').on('click', function () {
        //   var fileId =  $(this).attr('file-id');
        //
        //   $.ajax({
        //     url: '/GDrive/delete',
        //     data: {id: fileId},
        //     type: 'post',
        //     success: function (res) {
        //       alert('delete success');
        //     },
        //     error: function (err) {
        //       alert('delete error');
        //       console.error(err);
        //     }
        //   });
        // });

        console.log(res);

      },
      error: function (res) {
        console.log(res);
      }
    })
  },
  loadingRootFiles: function (files) {
    for (var key in files) {
      var html = dashboard.singleFile(files[key]);
      $(".folder-container").append(html);
    }
  },
  singleFile: function (file) {
    var fileHtml = '<div class="panel panel-default folder-single col-md-3">' +
      '<div class="panel-body text-center">' +
      '<div class="folder-img-container">';
    if (file.mimeType === "application/vnd.google-apps.folder") {
      fileHtml += '<img src="/img/folder.png" class="folder-img">';
    } else if (file.mimeType === "application/vnd.google-apps.document") {
      fileHtml += '<img src="/img/doc.png" class="folder-img">';
    } else {
      fileHtml += '<img src="/img/normalfile.png" class="folder-img">';
    }

    fileHtml += '</div>' +
      '<div class="col-md-12">' + file.name + '</div>' +
      '<div class="col-md-12"><span class="label label-default">important</span></div>' +
      '<div class="col-md-12">' +
      '<a class="btn btn-primary">view</a>' +
      '<a class="btn btn-primary">download</a>' +
      '<a class="btn btn-primary delete-file" file-id="'+ file.id +'">delete</a>' +
      '</div>' +
      '</div></div>';

    return fileHtml;
  }
};

$(function () {
  dashboard.init();
});



