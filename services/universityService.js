app.service("universityService", function ($http, $window, $location) {

  // Fetch all university according to search country.
  this.getUniversityData = function (searchCountry, sendfunc) {
    $http({
      method: "GET",
      url: `http://universities.hipolabs.com/search?country=${searchCountry}`,
    }).then(
      function (response) {
        sendfunc(response.data);
      },
      function (error) {
        console.log("Get University Data - Error: ", error);
      }
    );
  };

  // Fetch all favourite universities.
  this.isUniversityFavourite = function(favFun){
    $http({
      method: "GET",
      url: `http://localhost:3001/favourite`,
    }).then(function (response) {
      favFun(response.data);
    }, function (error) {
      console.log("Is University Favourite - Error: ", error);
    });
  }

  // Add to Favourite
  this.addToFavourite = function(userFav){
    $http({
      method: "POST",
      url: `http://localhost:3001/favourite`,
      data: userFav
    }).then(function (response) {
      console.log("Add To Favourite - response: ", response);
    }, function (error) {
      console.log("Add To Favourite - Error: ", error);
    });
  }

  // Redirect: To favourite page
  this.goToFavourite = function () {
    $location.path("/favourite");
  };

  // Redirect: To login page
  this.goToLogin = function () {
    $location.path("/login");
  };

  // Redirect: To particular university page
  this.goToParticularUniversity = function (linkTo) {
    $window.open(linkTo, "_blank");
  };
});
