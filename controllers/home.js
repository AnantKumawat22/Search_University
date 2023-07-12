// Controller
app.controller('homeCtrl', ['$scope', 'homeService',  function(sc, homeService){

    // Redirect: To register page
    sc.handleHomeRegisterBtn = function(){
        homeService.goToRegister();
    }
}]);

// Service

app.service('homeService', function($location){

    // Redirect: To register page
    this.goToRegister = () => {
        $location.path('/register');
    }
});