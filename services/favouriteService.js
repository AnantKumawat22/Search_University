app.service("favouriteService", function ($http, $location) {
  this.goToUniversity = function () {
    $location.path("/university");
  };

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
