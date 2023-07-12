app.controller("favouriteCtrl", [
  "$scope",
  "favouriteService",
  "$window",
  function (sc, favouriteService, $window) {
    // Check if user login or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (!checkAuth) {
      universityService.goToLogin();
    }

    sc.backToUniversityPage = function () {
      favouriteService.goToUniversity();
    };

    sc.handleRemoveFavClick = function (university) {
      favouriteService.deleteFavouriteUniversity(university.id);
    }

    
    favouriteService.getAllFavouriteUniversities(function (data) {
      sc.favUniversities = data.filter((data) => {
        return data.userEmail === JSON.parse(checkAuth).email;
      })
    });
    console.log(sc.favUniversities);
  },
]);
