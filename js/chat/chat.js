$(function(){

	var objFirebase = new Firebase("https://chatucc.firebaseio.com/");


	$('input[type=submit]').click(clickEnvio);


	function clickEnvio(){		
		var mensaje = $('#inMensaje').val();
		$('#inMensaje').val('');

		objFirebase.push(
			{  			
  				autor: "Jggomezt",  			
    			mensaje: mensaje
  			}
		);

		console.log(mensaje);
	}

	objFirebase.on("child_added", function(data){
		var registro = data.val();
		var plantilla = getPlantilla(registro.autor,registro.mensaje)
		$('.cont-mensajes-timeline').append(plantilla);		
	});

	function getPlantilla(autor, mensaje){
		var plantilla = '<div class="cont-mensajes-mensaje"> \
			<label for="" id="lblMensaje">'+ autor + ' --> '+ mensaje +'</label> \
			</div>';

		return plantilla;
	}





});