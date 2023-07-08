app.service("loginService", function ($http, $location) {
    // Route - login.html
    this.goToHome = function () {
      $location.path("/university");
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
  });
  