app.controller('lancamentos',function($rootScope, $scope,googleSheet,config){
    $rootScope.loading = true;
    $scope.resumo = {};
    
    $scope.getLancamentos = function(){
      googleSheet.setSpreadSheetId(config.idSheet);
      googleSheet.setSheetName(config.sheetDados);
      googleSheet.getAllRecords('associativeArray',function(data,status,message){
          
          $scope.resumo.lancamentos = data.splice(data.length-50,50);
          
          $scope.resumo.lancamentos.forEach(function(item){
              item.dataEHora = new Date(item.dataEHora);
          });
          
          $rootScope.loading = false;
      });
    }; 
    
    $scope.getLancamentos();
    
});