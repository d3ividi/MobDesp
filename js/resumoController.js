app.controller('resumo',function($rootScope, $scope, googleSheet, $filter, config){
    //$rootScope.loading = true;
    
    $scope.resumo = {};
    $scope.data = new Date();
    $scope.meses = {
        1:'Janeiro',
        2:'Fevereiro',
        3:'Março',
        4:'Abril',
        5:'Maio',
        6:'Junho',
        7:'Julho',
        8:'Agosto',
        9:'Setembro',
        10:'Outubro',
        11:'Novembro',
        12:'Dezembro'
    };
    $scope.anos = [
        2010,   
        2011,
        2012,
        2013,
        2014,
        2015
    ];
    
    
    $scope.getData = function(){
        $rootScope.loading = true;
        googleSheet.setSpreadSheetId(config.idSheet);
        googleSheet.setSheetName(config.sheetResumo);
        googleSheet.getColumnData(['mesEAno','entrada','saida'],'associativeArray',function(data,status,message){
            $scope.resumo.dados = data;
            $scope.updateResumo();
        });
    };
    
    $scope.updateResumo = function(){
        $scope.mes = $scope.data.getMonth()+1;
        $scope.ano = $scope.data.getFullYear();
        if(!$scope.resumo.dados){
            $scope.getData();
        }else{
            angular.forEach($scope.resumo.dados,function(item){
                if(item.mesEAno === $scope.mes+","+$scope.ano){
                     $rootScope.loading = false;
                     $scope.resumo.entrada = item.entrada;
                     $scope.resumo.saida = item.saida;
                     $scope.resumo.saldo = item.entrada - item.saida;
                     $rootScope.loading = false;
                }
            });
        }
    };
    
    $scope.updateMonth = function(next){
        var lastDay = new Date($scope.data.getFullYear(), $scope.data.getMonth() + 1, 0);
        lastDay = $filter('date')(lastDay,'dd');       
        $scope.data.setDate(next ? $scope.data.getDate() + parseInt(lastDay) : $scope.data.getDate() - parseInt(lastDay));
        $scope.updateResumo();
    };
    
    $scope.updateResumo();
    
});