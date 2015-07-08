app.controller('resumo',function($rootScope, $scope, googleSheet, $filter, config){
    $rootScope.loading = true;
    
    $scope.meses = [
        {value:1, label:'Janeiro'},
        {value:2, label:'Fevereiro'},
        {value:3, label:'Março'},
        {value:4, label:'Abril'},
        {value:5, label:'Maio'},
        {value:6, label:'Junho'},
        {value:7, label:'Julho'},
        {value:8, label:'Agosto'},
        {value:9, label:'Setembro'},
        {value:10, label:'Outubro'},
        {value:11, label:'Novembro'},
        {value:12, label:'Dezembro'}
    ];
    
    $scope.anos = [
        2010,
        2011,
        2012,
        2013,
        2014,
        2015
    ];
    
    $scope.mes = 7;
    $scope.ano = 2015;
    
    /*
     * Função para ativar o popup do calendário
     * @param {type} $event
     * @returns {undefined}
     */
    $scope.openCalendar = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
        console.log("merda");
    };

    $scope.resumo = {};
    $scope.resumo.data = new Date();
    
    $scope.updateResumo = function(){
        $rootScope.loading = true;
        googleSheet.setSpreadSheetId(config.idSheet);
        googleSheet.setSheetName(config.sheetResumo);
        googleSheet.getColumnData(['mesEAno','entrada','saida'],'associativeArray',function(data,status,message){
           angular.forEach(data,function(item){
               if(item.mesEAno === $scope.mes+","+$scope.ano){
                    $rootScope.loading = false;
                    $scope.resumo.entrada = item.entrada;
                    $scope.resumo.saida = item.saida;
                    $scope.resumo.saldo = item.entrada - item.saida;
               }
           });

            $rootScope.loading = false;
           
        });
    };
    
    $scope.updateResumo();
    
    console.log(new Date($scope.ano, $scope.mes, 0));
    console.log($filter('date')(new Date($scope.ano, $scope.mes, 0),'ddMMyyyy'));
    
});