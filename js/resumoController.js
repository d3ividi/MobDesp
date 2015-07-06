app.controller('resumo',function($scope,googleSheet,config){
    
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
    
    googleSheet.setSpreadSheetId(config.idSheet);
    googleSheet.setSheetName(config.sheetResumo);
    googleSheet.getColumnData(['entrada','saida'],'associativeArray',function(data,status,message){
       console.log(data); 
       console.log(status); 
       console.log(message); 
       $scope.resumo.entrada = data[0].entrada;
       $scope.resumo.saida = data[0].saida;
       $scope.resumo.saldo = data[0].entrada - data[0].saida;
       
    });
});