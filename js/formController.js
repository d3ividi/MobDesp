/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('formController',function($rootScope,$scope,googleSheet ){
    $scope.lmto = {};
    $scope.params = {};
    
    var categorias = {
        'Saída':[
            'Alimentação',
            'Investimentos',
            'Lazer',
            'Moradia, móveis e utencílios',
            'Outros',
            'Presentes',
            'Roupas e Calçados',
            'Taxas Financeiras',
            'Telefonia e Comunicação',
            'Transporte',
            'Saúde e Cuidados Pessoais'
        ],
        'Entrada':[
            'Salário do Emprego',
            'Trabalho Autônomo'
        ]
    };

    $scope.showCategorias = function(){
        $scope.params.categoria = categorias[$scope.lmto.tipoRegistro];
    };
    
    $scope.enviar = function(){
        
        $scope.transaction = {};
        $rootScope.loading = true;

        if($scope.lmto.tipoRegistro === 'Entrada'){
            $scope.lmto.categoriaEntrada = $scope.categoria;
        }else{
            $scope.lmto.categoriaSaida = $scope.categoria;
        }

        googleSheet.setSpreadSheetId("1H4vqt6L-pamS9sA5n_6qt_Sf2sY1N-bbhx3fxu1ZQSg");
        googleSheet.setSheetName("Entrada de Dados");
        googleSheet.insertRecord($scope.lmto,function(data,status,message){
           $rootScope.loading = false;
           $scope.transaction.status = status;
           $scope.transaction.message = message;
           if(status){
                $scope.lmto = "";
                $scope.categoria = "";
           }else{
               $scope.transaction.message = "Erro Inesperado! "+message;
           }
           
        });
    };
});

