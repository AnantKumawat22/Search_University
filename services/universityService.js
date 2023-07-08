app.service("universityService", function ($http, $location) {
  this.getUniversityData = function (searchCountry, sendfunc) {
    $http({
      method: "GET",
      url: `http://universities.hipolabs.com/search?country=${searchCountry}`,
    }).then(function (response) {
        sendfunc(response.data);
    }, function (error) {
        console.log("Error: ", error);
    })
  };

  // Redirect - login.html
  this.goToLogin = function () {
    $location.path('/login');
  }
});
