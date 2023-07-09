app.controller("registerCtrl", [
  "$scope",
  "registerService",
  "$window",
  function (sc, registerService, $window) {
    // Check user logged in or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (checkAuth) {
      registerService.goToUniversity();
    }

    // Name
    sc.fullName = "";

    // Email
    sc.email = "";

    // Password
    sc.password = "";

    // Confrim Password
    sc.cPassword = "";

    // Form Submit Button
    sc.handleFormSubmit = () => {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      // check name validation.
      if (sc.fullName.trim() === "") {
        alert("Name can't be empty.");
        return;
      }

      // check email validation.
      if (!validRegex.test(sc.email)) {
        alert("Enter valid email.");
        return;
      }

      // passwrod validation.
      if (sc.password.length < 6) {
        alert("Password must contain atleast 6 characters.");
        return;
      } else if (sc.password.includes(" ")) {
        alert("Password shouldn't contain any space.");
        return;
      }

      // confirm password check validation.
      if (sc.cPassword.length < 6) {
        alert("Confrim Password must contain atleast 6 characters.");
        return;
      } else if (sc.cPassword.includes(" ")) {
        alert("Confirm Password shouldn't contain any space.");
        return;
      } else if (sc.password !== sc.cPassword) {
        alert("Password and confrim password didn't matched.");
        return;
      }

      // check if the user already exist or not.
      registerService.getUsers(function (data) {
        sc.user = data.filter((data) => {
          return data.email === sc.email;
        });

        if (sc.user.length === 0) {

          // Hash Password.

          registerService.addUser({
            fullName: sc.fullName,
            email: sc.email,
            password: sc.password,
            cPassword: sc.password,
          });
          alert("You are registered Successfully.");
          registerService.goToLogin();
        } else {
          alert("User already exist.");
          return;
        }
      });
    };
  },
]);
