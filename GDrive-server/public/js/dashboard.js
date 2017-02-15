var dashboard = {
    init: function init() {
      dashboard.getRootFiles();

      dashboard.initToDo();
      dashboard.chartBotManager();


      $('#upload').click(function () {
        var formData = new FormData();
        var files = $('#input-file')[0].files;
        if (files.length == 0) {
          alert('not files are selected.')
          return;
        }
        for (var key in files) {
          formData.append('file' + key, files[key]);
        }
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
        '<a class="btn btn-primary delete-file" file-id="' + file.id + '">delete</a>' +
        '</div>' +
        '</div></div>';

      return fileHtml;
    },
    initToDo: function () {
      var mockData = {
        'todo1': {
          name: 'edit jira card 013',
          selected: false,
        },
        'todo2': {
          name: 'edit jira card 014',
          selected: false,
        },
        'todo3': {
          name: 'edit jira card 015',
          selected: true,
        },
        'todo4': {
          name: 'edit jira card 016',
          selected: false,
        },
        'todo5': {
          name: 'edit jira card 017',
          selected: false,
        },
        'todo6': {
          name: 'edit jira card 018',
          selected: false,
        }
      };


      for (var key in mockData) {

        if(mockData[key].selected){
          $(".js-hook-todo-content").append('<div class="col-md-12 todo-item" data="true"><div class="area-board col-md-12 active"><div class="col-md-10">' + mockData[key].name + '</div><div class="col-md-2 todo-icon" style=""><i class="fa fa-check" aria-hidden="true"></i></div></div></div>');
        }else
        {
          $(".js-hook-todo-content").append('<div class="col-md-12 todo-item" data="false"><div class="area-board col-md-12"><div class="col-md-10">' + mockData[key].name + '</div><div class="col-md-2 todo-icon" style="display: none"><i class="fa fa-check" aria-hidden="true"></i></div></div></div>');
        }
      }

      $(".todo-item").click(function(){

        if($(this).attr('data')=="true")
        {
          $(this).attr('data',"false");
          $(this).find(".area-board").removeClass("active");
          $(this).find('.todo-icon').hide();

        }else {
          $(this).attr('data',"true");
          $(this).find(".area-board").addClass("active");
          $(this).find('.todo-icon').show();
        }

      });

    },
    chartBotManager:function(){
      $(".online-team-area").click(function(){
        $(".member-chart").show();
      });

      $(".mask").click(function(){
        $(".member-chart").hide();
      });

      // sendMsg
      $("#sendMsg").click(function(){
        $(".member-chart img").attr("src", "/img/chartBot2.png");
      });

      // testComment
      $("#testComment").click(function(){
        $.ajax({
          url: '/GDrive/create-comment',
          data: {
            fileId: '0ByRMpfLB1qdiMXJtb3FucTYydkk'
          },
          type: 'post',
          success: function (res) {
            alert('create comment success');
            location.reload();
          },
          error: function (err) {
            alert('create comment error');
            console.error(err);
          }
        });
      });
    }
}


$(function () {
  dashboard.init();
});



