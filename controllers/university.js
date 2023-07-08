app.controller("universityCtrl", [
  "$scope",
  "universityService",
  "$window",
  function (sc, universityService, $window) {
    // Check if user logged in or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (!checkAuth) {
        universityService.goToLogin();
    }

    sc.countrySearch = "india";
    sc.universitySearch = "";

    // Logout
    sc.handleLogout = function () {
      $window.localStorage.removeItem('user');
      universityService.goToLogin();
    };

    universityService.getUniversityData(sc.countrySearch, function (data) {
      sc.universities = data;
      console.log(sc.universities);
    });

    sc.handleCountrySearch = function () {
      universityService.getUniversityData(sc.countrySearch, function (data) {
        sc.universities = data;
        console.log(sc.universities);
      });
    };

    sc.handleUniversitySearch = function () {};
  },
]);
