(function(){
  angular.module('meanApp').controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication){
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function(){
      console.log("Getting details");
      authentication.login(vm.credentials).error(function(err){
        alert("Username or Password is invalid");
      })
        .then(function(){
        $location.path('profile');
      });
    };
  }
})();
