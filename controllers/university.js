app.controller("universityCtrl", [
  "$scope",
  "universityService",
  "$window",
  function (sc, universityService, $window) {
    // Check if user login or not.
    var checkAuth = $window.localStorage.getItem("user");
    if (!checkAuth) {
      universityService.goToLogin();
    }

    // User Email
    sc.userEmail = JSON.parse(checkAuth).email;

    // University searched
    sc.searchedUniversity = [];

    // Search country input field.
    sc.countrySearch = "";

    // Search university input field.
    sc.universitySearch = "";

    // Logout
    sc.handleLogout = function () {
      $window.localStorage.removeItem("user");
      universityService.goToLogin();
    };

    // Get university data.
    universityService.getUniversityData("india", function (data) {
      sc.universities = data;
    });

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

    sc.handleUniversitySearchChange = function () {
      sc.searchedUniversity = sc.universities?.filter((data) => {
        return data.name
          .toLowerCase()
          .includes(sc.universitySearch?.toLowerCase().trim());
      });
    };

    // Redirect on Favourite.html
    sc.showFavouritePage = function () {
      universityService.goToFavourite();
    };

    // Copy the university name.
    sc.copyClipboard = function (dataToCopy) {
      navigator.clipboard.writeText(dataToCopy);
    };

    sc.handleFavClick = function (university) {
      // If the university is already in favourite.
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

    sc.openUniversityLink = function (linkTo) {
      universityService.goToParticularUniversity(linkTo);
    };
  },
]);
