app.controller("universityCtrl", [
  "$scope",
  "universityService",
  "$window",
  function (sc, universityService, $window) {
    // Check if user login or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (!checkAuth) {
      // Redirect: To login page. If the user not logged-in.
      universityService.goToLogin();
    }

    // User Email
    sc.userEmail = JSON.parse(checkAuth).email;

    // Search country input field.
    sc.countrySearch = "";

    // Search university input field.
    sc.universitySearch = "";

    // Logout
    sc.handleLogout = function () {
      $window.localStorage.removeItem("user");
      universityService.goToLogin();
    };

    // Fetch university data - india.
    universityService.getUniversityData("india", function (data) {
      sc.universities = data;
    });

    // Fetch university data according to search country.
    sc.handleCountrySearch = function () {
      // Loading Spinner - Start.
      sc.isSearchCountryLoader = true;
      var button = document.getElementById("search-button");
      button.classList.add("loading");

      universityService.getUniversityData(sc.countrySearch, function (data) {
        sc.universities = data;

        // Loading Spinner - End.
        button.classList.remove("loading");
        sc.isSearchCountryLoader = false;
        sc.countrySearch = "";
      });
    };

    // Search university by name.
    sc.handleUniversitySearchChange = function () {
      sc.searchedUniversity = sc.universities?.filter((data) => {
        return data.name
          .toLowerCase()
          .includes(sc.universitySearch?.toLowerCase().trim());
      });
    };

    // Copy to clipboard - The university name.
    sc.copyClipboard = function (dataToCopy) {
      navigator.clipboard.writeText(dataToCopy);
    };

    // Add university as favourite.
    sc.handleFavClick = function (university) {
      // If the university is already in favourite - Don't add in favourite.
      universityService.isUniversityFavourite(function (data) {
        sc.isCheckFav = data.filter((data) => {
          return (
            data.userEmail === JSON.parse(checkAuth).email &&
            data.name === university.name
          );
        });

        if (sc.isCheckFav.length) {
          alert("Already added to favourite.");
          return;
        } else {
          university.userEmail = JSON.parse(checkAuth).email;
          universityService.addToFavourite(university);
          alert("Added to Favourite.");
        }
      });
    };

    // Redirect: To favourite page
    sc.showFavouritePage = function () {
      universityService.goToFavourite();
    };

    // Redirect: To particular university page
    sc.openUniversityLink = function (linkTo) {
      universityService.goToParticularUniversity(linkTo);
    };
  },
]);
