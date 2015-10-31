(function(){

	var app = angular.module('chatangular', ["firebase"]);

	app.controller('chatcontroller', function($scope, $firebaseObject){

		// Declaraciones
		vm = this;
		var objFirebase = new Firebase("https://chatucc.firebaseio.com/");

		$scope.data = $firebaseObject(objFirebase);

		//Modelos
		vm.mensajeEntrada = {
			autor: 'Jggomezt',
			msg: ''
		};

		vm.lstMsg = [];

		//

		// Funciones Controlador

		vm.enviarMsg = function(){			

			objFirebase.push(
				{  			
	  				autor: vm.mensajeEntrada.autor,  			
	    			mensaje: vm.mensajeEntrada.msg
	  			}
			);

			vm.mensajeEntrada.msg = '';

		}

		objFirebase.on("child_added", function(data){
			var registro = data.val();
			var class_msg = "msg";

			if (registro.autor == vm.mensajeEntrada.autor) 
			{
				class_msg = "msg me";

			}
			
			vm.lstMsg.push({
				autor : registro.autor,
				msg : registro.mensaje,
				class_msg : class_msg
			});

		});		


	} );


})();