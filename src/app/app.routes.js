function routeProvider($routeProvider){
    $routeProvider
      .when('/', {
          template: '<dashboard initial-data="$resolve.initialData"></dashboard>',
          resolve: {
            initialData: function($http){
              return $http({
                method: 'GET',
                url: './assets/data.json'
              }).then(function successCallback(response) {
                return response.data;
              })
            }            
          }
      });
}

routeProvider.$inject = ['$routeProvider'];

angular.module('root')
  .config(routeProvider);