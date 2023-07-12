app.controller("loginCtrl", [
  "$scope",
  "loginService",
  "$window",
  function (sc, loginService, $window) {
    // Check user logged in or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (checkAuth) {
      // Redirect: To university page. If the user already logged-in.
      loginService.goToUniversity();
    }

    // Email field
    sc.email = "";

    // Password field
    sc.password = "";

    // handle login form Submit
    sc.handleFormSubmit = () => {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      // check email validation.
      if (!validRegex.test(sc.email)) {
        alert("Enter valid email.");
        return;
      }

      // password validation.
      if (sc.password.length < 6) {
        alert("Password must contain atleast 6 characters.");
        return;
      } else if (sc.password.includes(" ")) {
        alert("Password shouldn't contain any space.");
        return;
      }

      // Fetch all registered users to check login credentials.
      loginService.getUsers(function (data) {
        sc.user = data.filter((data) => {
          return data.email === sc.email && data.password === sc.password;
        });

        if (sc.user?.length === 0) {
          alert("Enter valid credentials.");
          return;
        }
        $window.localStorage.setItem("user", JSON.stringify(sc.user[0]));
        alert("Login Successful.");
        loginService.goToUniversity();
      });
    };
  },
]);
