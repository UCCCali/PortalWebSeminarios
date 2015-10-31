$(function(){


	var geolocalizacion = navigator.geolocation;
	var opciones = {};

	geolocalizacion.getCurrentPosition(geoExito, geoError, opciones);

	function geoExito(posicion){		
		var lat = posicion.coords.latitude;
		var lon = posicion.coords.longitude;		

		var mapa = new Image();

		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?"+
			"zoom=17&size=250x250&sensor=false&center="+lat+","+lon+"&maptype=hybrid&format=png"+
			"&visual_refresh=true&markers=size:mid%7Color:red%7Clabel:1%7C"+lat+","+lon;

		$(".geomapa").append(mapa);
	}

	function geoError(error){
		console.log("error -> "+ error.code + " ---> "+error.message);
	}

	$("#btnEnviar").click(addCliente);

	function addCliente(){
		var nombres = $("#txtNombres").val();
		var apellidos = $("#txtApellidos").val();
		var email = $("#txtemail").val();
		var celular = $("#txtCelular").val();
		var fechaNac = $("#txtFechaNac").val();

		console.log(nombres);
		console.log(apellidos);
		console.log(email);
		console.log(celular);
		console.log(fechaNac);

		var data = {
 					"apellidos": apellidos,
 					"celular": celular,
 					"email": email,
 					"fechaNacimiento": fechaNac,
 					"nombres": nombres
			};

		$.ajax({
			url: 'https://1-dot-inturikstart.appspot.com/_ah/api/clienteendpoint/1/insertar',
			dataType: "json",
			contentType: "application/json; chartset=utf-8",
			type: "POST",
			data: JSON.stringify(data),
			success: function(data){
				console.log("Guardado Correctamente");
				console.log(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				console.log("ERROR");
				console.log(xhr.status);
				console.log(thrownError);
			}			
		});

	}


	$.ajax({
			url: 'https://1-dot-inturikstart.appspot.com/_ah/api/clienteendpoint/1/gettodos',
			dataType: "jsonp",
			contentType: "application/json; chartset=utf-8",
			type: "GET",			
			success: function(data){
				console.log("Consultado Correctamente");
				console.log(data);
				$.each(data.items, function(index, valor){
					console.log("Nombre -> "+ valor.nombres);
				});
			},
			error: function(xhr, ajaxOptions, thrownError){
				console.log("ERROR");
				console.log(xhr.status);
				console.log(thrownError);
			}			
		});


});