app.controller("favouriteCtrl", [
  "$scope",
  "favouriteService",
  "$window",
  function (sc, favouriteService, $window) {
    // Check if user login or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (!checkAuth) {
      // Redirect: To login page. If user not logged-in.
      universityService.goToLogin();
    }

    // Redirect: To university page
    sc.backToUniversityPage = function () {
      favouriteService.goToUniversity();
    };

    // Copy the university name.
    sc.copyClipboard = function (dataToCopy) {
      navigator.clipboard.writeText(dataToCopy);
    };

    // Redirect: To particular university page
    sc.openUniversityLink = function (linkTo) {
      favouriteService.goToParticularUniversity(linkTo);
    };

    // Delete Favourite university.
    sc.handleRemoveFavClick = function (university) {
      favouriteService.deleteFavouriteUniversity(university.id);
    };

    // Fetch all favourite universities.
    favouriteService.getAllFavouriteUniversities(function (data) {
      sc.favUniversities = data.filter((data) => {
        return data.userEmail === JSON.parse(checkAuth).email;
      });
    });
  },
]);
