// Controller
app.controller('homeCtrl', ['$scope', 'homeService',  function(sc, homeService){
    sc.handleHomeRegisterBtn = function(){
        console.log("fnkf")
        homeService.goToRegister();
    }
}]);

// Service

app.service('homeService', function($location){
    this.goToRegister = () => {
        $location.path('/register');
    }
});