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
    } else if (file.mimeType === "text/plain") {
      var fileItem = '<div class="file-item col-md-2 text-center" bind-data="' + file.id + '">' +
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
  },
  fileClickBinding: function fileBind() {
    $(".file-item").click(function () {
      var id = $(this).attr("bind-data");
      location.href = "/GDrive/fileContent?id=" + id;
    });
  }
};


var fileContent = {
  init: function () {
    var id = fileContent.getUrlParameter('id');
    fileContent.getContent(id);
    fileContent.updateBar();
    fileContent.shareBtnBind();

  },
  updateBar: function updateBar() {

    var barQueue = JSON.parse(localStorage.getItem('bar-que'));

    var barHTML = '<a href="/GDrive/projects">Project</a>';

    if (barQueue) {

      for (var key = 0; key < barQueue.length; key++) {
        var obj = barQueue[key];
        barHTML += ' &nbsp&nbsp>&nbsp&nbsp <a href="' + obj.url + '">' + obj.name + '</a>';
      }
    }

    $("#proj-bar").html(barHTML);

  },
  getContent: function (id) {
    $.ajax({
      url: "/GDrive/getContent?id=" + id,
      method: "get",
      success: function (res) {

        $('.file-content').append(res);
      },
      error: function (res) {
        console.log(res);
      }
    })
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
  shareBtnBind: function shareBtnBind() {
    $(".js-hook-share-btn").click(function () {

      $(".share-weChart").show();
    })

    $(".share-img").click(function () {
      $(".share-img-list").show();
      $(this).hide();
    });

    $(".share-img-list").click(function () {
      $(".share-weChart").hide();
      $(".share-img").show();
      $(this).hide();
    });
  },


}

var comments = {
  init: function init() {
    var id = ProjectDetail.getUrlParameter("id");
    comments.eventBinding(id);
    comments.loadComment(id);
    comments.commentAreaBinding();
  },
  loadComment: function initComment(id) {
    $.ajax({
      url: '/GDrive/get-comments',
      data: {
        fileId: id
      },
      type: 'post',
      success: function (res) {
        var comments = res.comments;
        if (comments.length > 0) {
          for (var key in comments) {
            var template = '<div class="comment-item col-md-12">' +
              '<div class="col-md-12">' +
              '<i>'+moment(comments[key].createdTime).format('MMMM Do YYYY, h:mm:ss a')+'</i>' +
              '</div>' +
              '<div class="col-md-12">' +
              '<label>'+comments[key].author.displayName+':</label> <span>'+comments[key].content+'</span>' +
              '</div>' +
              '</div>';

            $("#commentBar").append(template);
          }
        }
      },
      error: function (err) {
        alert('get comments error');
        console.error(err);
      }
    });
  },
  eventBinding: function eventBinding(id) {
    $("#sendComment").click(function () {
      var commentContent = $("#commentContent").val();
      if (!commentContent) return;

      $.ajax({
        url: '/GDrive/create-comment',
        data: {
          fileId: id,
          content: commentContent
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
  },
  commentAreaBinding: function () {
    $(".js-hook-comments").click(function () {
      $(".comment-bar-area").show();
      $(".recommend-doc-area").hide();
    });

    $(".js-hook-recommend").click(function () {
      $(".comment-bar-area").hide();
      $(".recommend-doc-area").show();
    });

  }
}

$(function () {
  fileContent.init();
  comments.init();
});



