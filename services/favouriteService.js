app.service("favouriteService", function ($http, $window, $location) {
  // Redirect: To university page
  this.goToUniversity = function () {
    $location.path("/university");
  };

  // Redirect: To particular university
  this.goToParticularUniversity = function (linkTo) {
    $window.open(linkTo, "_blank");
  };

  // Delete university from favourite.
  this.deleteFavouriteUniversity = function (universityId) {
    $http({
      method: "DELETE",
      url: `http://localhost:3001/favourite/${universityId}`,
    }).then(
      function (response) {
        console.log("Delete Favourite University - response: ", response);
      },
      function (error) {
        console.log("Delete Favourite University - Error: ", error);
      }
    );
  };

  // Fetch all favourite university.
  this.getAllFavouriteUniversities = function (getDataFun) {
    $http({
      method: "GET",
      url: `http://localhost:3001/favourite`,
    }).then(
      function (response) {
        getDataFun(response.data);
      },
      function (error) {
        console.log("Get All Favourite Universities - Error: ", error);
      }
    );
  };
});
