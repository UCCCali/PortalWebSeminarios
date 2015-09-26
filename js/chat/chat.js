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
		var plantilla = getPlantilla(registro.autor,registro.mensaje);		
		$('.cont-mensaje-timeline').append(plantilla);
	});

	function getPlantilla(autor, mensaje){
		var plantilla = '<article class="cont-mensaje"> \
			 	<div class="cont-mensaje-texto"> \
					<figure class="cont-imagen-autor"> \
						<img src="../imgs/avatarjgomez.jpg"> \
					</figure> \
					<div class="cont-mensaje-detalles"> \
						<p class="cont-mensaje-detalles-txt">'+ mensaje +'</p> \
						<label class="cont-mensaje-detalles-fecha" >Hace 20 Min</label>	\
					</div> \
				</div> \
				<div class="cont-mensaje-meta"> \
					<div class="cont-mensaje-autor"> \
							por <a href="#">'+autor+'</a> \
					</div> \
					<div class="cont-mensaje-fecha"> \
						<label class="fecha"> \
							26/09/2015 \
						</label> \
						<a class="estrellita" href="#">	##	\
						</a> \
					</div> \
				</div>		\
			</article>';

		return plantilla;
	}





});