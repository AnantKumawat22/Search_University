app.service("loginService", function ($http, $location) {
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
          console.log("Get Users - Error: ", error);
        }
      );
    };
  });
  