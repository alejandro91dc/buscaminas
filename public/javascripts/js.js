$(document).ready(function() {
	var socket = io();
	var element = document.getElementById("marca");
	
	socket.on('connect', function(){
		console.log('Hola Servidor ');
	});

	socket.on('vista', function(player){
		element.innerHTML = "Eres el jugador Nº"+player;
	}); 
	socket.on('azul', function(seccion){
		$('#'+seccion).css('background-color','rgb(0, 0, 255)');
		compruebaColor();
	});
	socket.on('rosa', function(seccion){
		$('#'+seccion).css('background-color','rgb(255, 153, 255)');
		compruebaColor();
	});
	socket.on('violeta', function(seccion){
		$('#'+seccion).css('background-color','rgb(153, 51, 255)');
		compruebaColor();
	});
	socket.on('amarillo', function(seccion){
		$('#'+seccion).css('background-color','rgb(255, 255, 0)');
	});
	socket.on('verde', function(seccion){
		$('#'+seccion).css('background-color','rgb(0, 255, 0)');
		compruebaColor();
	});
	socket.on('rojo', function(seccion){
		$('#'+seccion).css('background-color','rgb(255, 0, 0)');
		compruebaColor();
	});

	
	function compruebaColor() {
		var b = 0, p = 0, pp = 0, y = 0, g = 0, r = 0;
		for (var i = 1; i < 19 ; i++) {
			color = $('#casilla'+i).css("background-color");
			if (color == "rgb(0, 0, 255)") {
				b++;				
			}
			else if (color == 'rgb(255, 153, 255)') {
				p++;
			}
			else if (color == 'rgb(153, 51, 255)') {
				pp++;
			}
			else if (color == 'rgb(255, 255, 0)') {
				y++;
			}
			else if (color == 'rgb(0, 255, 0)') {
				g++;
			}
			else if (color == 'rgb(255, 0, 0)')
				r++;
		}
	}

	compruebaBomba();

	function compruebaBomba() {
		socket.on('bomba', function(aleatorio){
			for (var i = 1; i < 49; i++){
				$('#casilla'+i).text("");
			}
			color = $('#casilla'+aleatorio).prepend('<img id="bomba" src="bomba.png" heigh="90" width="90"/>');
		});
		$('li').click(function(){
			var id = $(this).find('img').length;
			if (id == 1) {
			$("img").css({"visibility":"visible"});
			alert("ha perdido el jugador"+socket.id);
			}	
		});	
	}

	$('li').click(function(){
		seccion = this.id;
		socket.emit('click', seccion);
	});
});