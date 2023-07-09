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
      });
    };

    sc.handleUniversitySearchChange = function () {
      sc.searchedUniversity = sc.universities?.filter((data) => {
        return data.name.toLowerCase().includes(sc.universitySearch?.toLowerCase().trim());
      });
      console.log(sc.searchedUniversity)
    };

    // Copy the university name.
    sc.copyClipboard = function (dataToCopy) {
      navigator.clipboard.writeText(dataToCopy);
    };
  },
]);

app.directive("infiniteScroll", [
  "$window",
  function ($window) {
    return {
      link: function (scope, element, attrs) {
        var rawElement = element[0];

        function onScroll() {
          if (
            rawElement.scrollTop + rawElement.offsetHeight >=
            rawElement.scrollHeight
          ) {
            scope.$apply(attrs.infiniteScroll);
          }
        }

        angular.element($window).bind("scroll", onScroll);

        scope.$on("$destroy", function () {
          angular.element($window).unbind("scroll", onScroll);
        });
      },
    };
  },
]);
