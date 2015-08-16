// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('Mobdesp', [
  'ngRoute',
  'mobile-angular-ui',
  'ui.utils.masks',
  'mtl.googleSheet',
  'ngSanitize',
  'ui.bootstrap',
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
    $routeProvider.when('/',              {templateUrl: 'views/resumo.html', reloadOnSearch: false});
    $routeProvider.when('/form',         {templateUrl: 'views/form.html', reloadOnSearch: false});
    $routeProvider.when('/lancamentos',         {templateUrl: 'views/lancamentos.html', reloadOnSearch: false});
});

app.constant('config',{
    idSheet : '1H4vqt6L-pamS9sA5n_6qt_Sf2sY1N-bbhx3fxu1ZQSg',
    sheetResumo : 'Resumo',
    sheetDados : 'Entrada de Dados',
    sheetBalanco : 'Conciliação e Balanço'
});



app.controller('MainController', function($rootScope, $scope){

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });


});

app.directive('filterData',function(){
    return{
      template : ""   
    };
});