// SSD oAuth Code - IT17006712 Dias A.A.M.R.
// IT17038638 - Pannala U.K.
// Signin Function Implementation

// This Function handles the API Auth keys
// API_CLIENT_ID - Provide by Google API Console to Identify Service
// API_REDIRECT_URL_NAME - The Redirected URL with tockens

$(document).ready(function () {
  var API_CLIENT_ID =
    "218161054744-3u1fcq2d8a8c8lnj7h2l6ra11k66o3s8.apps.googleusercontent.com";

  var API_REDIRECT_URL_NAME = "http://localhost:8080/oauth/upload.html";
  FORWARD_URL = "";
  var SCOUP = "https://www.googleapis.com/auth/drive";

  $("#signIn").click(function () {
    SigninToGoogleDrive(
      API_CLIENT_ID,
      API_REDIRECT_URL_NAME,
      SCOUP,
      FORWARD_URL
    );
  });

  function SigninToGoogleDrive(
    API_CLIENT_ID,
    API_REDIRECT_URL_NAME,
    SCOUP,
    FORWARD_URL
  ) {
    FORWARD_URL =
      "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" +
      API_REDIRECT_URL_NAME +
      "&prompt=consent&response_type=code&client_id=" +
      API_CLIENT_ID +
      "&scope=" +
      SCOUP +
      "&access_type=offline";

    window.location = FORWARD_URL;
  }
});
