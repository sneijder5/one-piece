
let _mainModule = angular.module( "mainModule", [] );



_mainModule.controller(
    'mainCtrl'
    , function( $scope, $http ) {

        $scope.Selected = {};

        $scope.datos = $http({
            method: 'GET',
            url: '../res/tripulantes.json'
         }).then(function (data){
            $scope.tripulante = data.data; 
            $scope.Selected = $scope.tripulante[0];
            $scope.Selected.styleF = $scope.tripulante[0].style[0];
            $scope.Selected.selected = true;

            $scope.llenarBarra();

         },function (error){

         });
         

         $scope.selectTripulante = ( _tripulante ) => {
            
            ($scope.tripulante || []).forEach( _i => _i.selected = false );

            if( !_tripulante.loaded ) {

                _tripulante.loading = true;
                $scope.Selected = _tripulante;
                $scope.Selected.styleF =_tripulante.style[0];
                $scope.Selected.selected = true;

                $scope.llenarBarra();

            } else {    
                _tripulante.selected = true;
                $scope.Selected = _tripulante;              
            }
        } 
 
        $scope.like = ( like ) => {

            if (localStorage.getItem($scope.Selected.name)) {
                
                datos = JSON.parse(localStorage.getItem($scope.Selected.name));
                totalVotos = datos.total + 1;
                
                totalLike = datos.like + 1;
               
                widthLike = Math.round((totalLike/ totalVotos) * 100);
               
                widthDislike = 100 - widthLike;
               
                document.getElementById('div1').style.width = widthLike+"%";
                document.getElementById('div1').style.background = datos.color;
                $scope.porcentaje_like = widthLike+"%";

                document.getElementById('div2').style.width = widthDislike+"%";
                
                if (widthDislike != 0 ) {
                    $scope.porcentaje_dislike = widthDislike+"%";
                }
                
                datos.total = totalVotos;
                datos.like = totalLike;

                datosNew = JSON.stringify(datos);
                localStorage.setItem(datos.name, datosNew);
                

            } else {

                $scope.Selected.like = 1;
                $scope.Selected.dislike = 0;
                $scope.Selected.total = 1;
                datos = JSON.stringify($scope.Selected);
                localStorage.setItem($scope.Selected.name, datos);
                document.getElementById('div1').style.width = "100%";
                document.getElementById('div1').style.background = $scope.Selected.color;
                document.getElementById('div2').style.width = "0%";
                $scope.porcentaje_like = "100%";
            }

        }
        
        $scope.dislike = ( dislike ) => {


            if (localStorage.getItem($scope.Selected.name)) {
                
                datos = JSON.parse(localStorage.getItem($scope.Selected.name));
                totalVotos = datos.total + 1;
                
                totalDislike = datos.dislike + 1;               

                widthDislike = Math.round((totalDislike/ totalVotos) * 100);
                widthlike = 100 - widthDislike;

                document.getElementById('div2').style.width = widthDislike+"%";                
                $scope.porcentaje_dislike = widthDislike+"%";

                document.getElementById('div1').style.width = widthlike+"%";
                if (widthlike != 0 ) {
                    $scope.porcentaje_like = widthlike+"%";
                }
                
                datos.total = totalVotos;
                datos.dislike = totalDislike;

                datosNew = JSON.stringify(datos);
                localStorage.setItem(datos.name, datosNew);
                

            } else {

                $scope.Selected.like = 0;
                $scope.Selected.dislike = 1;
                $scope.Selected.total = 1;
                datos = JSON.stringify($scope.Selected);
                localStorage.setItem($scope.Selected.name, datos);
                document.getElementById('div2').style.width = "100%";
                document.getElementById('div1').style.width = "0%";
                $scope.porcentaje_dislike = "100%";
            }
        }

        $scope.llenarBarra = () => {
            if (localStorage.getItem($scope.Selected.name)) {
                
                datos = JSON.parse(localStorage.getItem($scope.Selected.name));
                totalVotos = datos.total ;
                
                totalLike = datos.like;                

                widthLike = Math.round((totalLike/ totalVotos) * 100);
                
                widthDislike = 100 - widthLike;
                
                document.getElementById('div1').style.width = widthLike+"%";
                document.getElementById('div1').style.background = datos.color;
                $scope.porcentaje_like = widthLike+"%";

                document.getElementById('div2').style.width = widthDislike+"%";
                
                if (widthDislike != 0 ) {
                    $scope.porcentaje_dislike = widthDislike+"%";
                } else {
                    $scope.porcentaje_dislike ="";

                }
                
                datos.total = totalVotos;
                datos.like = totalLike;

                datosNew = JSON.stringify(datos);
                localStorage.setItem(datos.name, datosNew);
                

            } else {
                document.getElementById('div1').style.width = "0%";
                document.getElementById('div2').style.width = "0%";
                $scope.porcentaje_dislike = "";
                $scope.porcentaje_like = "";
            }
        }
        
    }
);
