app.service("registerService", function ($http, $location) {
  // Route - register.html
  this.goToLogin = function () {
    $location.path("/login");
  };

  // Route - university.html
  this.goToUniversity = function () {
    $location.path("/university");
  };

  // Get User.
  this.getUsers = (any) => {
    $http({
      method: "GET",
      url: "http://localhost:3000/users",
    }).then(
      function (response) {
        any(response.data);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  // Add a User.
  this.addUser = (user) => {
    $http({
      method: "POST",
      url: "http://localhost:3000/users",
      data: user,
    }).then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };
});
