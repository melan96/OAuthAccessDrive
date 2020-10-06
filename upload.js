// SSD oAuth Code - IT17006712 Dias A.A.M.R.
// IT17038638 - Pannala U.K.
// Google Drive fileupload

$(document).ready(function () {
  const URLParams = new URLSearchParams(window.location.search);
  const SCOPE = "https://www.googleapis.com/auth/drive";
  const CODE = urlParams.get("code");

  const REDIRECT_URL = "http://localhost:8080/oauth/upload.html";
  const CLIENT_SECRET = "XepJbOR8rXQCStXUtR6rA8JL";
  var CLIENT_ID =
    "218161054744-3u1fcq2d8a8c8lnj7h2l6ra11k66o3s8.apps.googleusercontent.com";

  $.ajax({
    type: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    data: {
      code: CODE,
      redirectUrl: REDIRECT_URL,
      clientSecret: CLIENT_SECRET,
      clientId: CLIENT_ID,
      scope: SCOPE,
      grantType: "authorization_code",
    },
    dataType: "json",
    success: function (resultData) {
      localStorage.setItem("accessToken", resultData.access_token);

      localStorage.setItem("refreshToken", resultData.refreshToken);

      localStorage.setItem("expires_in", resultData.expires_in);

      window.history.pushState(
        {},
        document.title,
        "/GoogleLoginApp/" + "upload.html"
      );
    },
  });

  class Upload {
    constructor(file) {
      this.file = file;
    }

    getSize() {
      localStorage.setItem("size", this.file.size);
      return this.file.size;
    }
    getType() {
      localStorage.setItem("type", this.file.type);
      return this.file.type;
    }
    getName() {
      return this.file.name;
    }
    doUpload() {
      var that = this;
      var formData = new FormData();

      formData.append("file", this.file, this.getName());
      formData.append("upload_file", true);

      $.ajax({
        type: "POST",
        beforeSend: function (request) {
          request.setRequestHeader(
            "Authorization",
            "Bearer" + " " + localStorage.getItem("accessToken")
          );
        },
        url: "https://www.googleapis.com/upload/drive/v2/files",
        data: {
          uploadType: "media",
        },
        xhr: function () {
          var myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            myXhr.upload.addEventListener(
              "progress",
              that.progressHandling,
              false
            );
          }
          return myXhr;
        },
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log(error);
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000,
      });
    }
    progressHandling(event) {
      var percent = 0;
      var position = event.loaded || event.position;
      var total = event.total;
      var progress_bar_id = "#progress-wrp";
      if (event.lengthComputable) {
        percent = Math.ceil((position / total) * 100);
      }

      $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
      $(progress_bar_id + " .status").text(percent + "%");
    }
  }

  $("#upload").on("click", function (e) {
    var file = $("#files")[0].files[0];
    var upload = new Upload(file);

    upload.doUpload();
  });
});
