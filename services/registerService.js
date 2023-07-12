app.service("registerService", function ($http, $location) {
  
  // Redirect: To login page
  this.goToLogin = function () {
    $location.path("/login");
  };

  // Redirect: To university page
  this.goToUniversity = function () {
    $location.path("/university");
  };

  // Fetch all the registered users.
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

  // Add a User.
  this.addUser = (user) => {
    $http({
      method: "POST",
      url: "http://localhost:3000/users",
      data: user,
    }).then(
      function (response) {
        console.log("Add User - response: ", response);
      },
      function (error) {
        console.log("Add User - Error: ", error);
      }
    );
  };
});
