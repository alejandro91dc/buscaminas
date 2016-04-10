$(document).ready(function() {
	var socket = io();
	var element = document.getElementById("marca");
	tganador = 10;

	socket.on('connect', function(){
		console.log('Hola Servidor ');

	});

	
	
	/*color = $('#canvas'+aleatorio).css('background-color','rgb(0, 0, 255)');*/

	socket.on('vista', function(player){
		element.innerHTML = "Eres el jugador: "+ player;
		element.innerHTML = "La bomba esta en: ";
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
			color = $('#canvas'+i).css("background-color");
			$('h4').text(color);

			if (color == "rgb(0, 0, 255)") {
				b++;
				$('#b').text(b);
			}
			else if (color == 'rgb(255, 153, 255)') {
				p++;
				$('#p').text(p);
			}
			else if (color == 'rgb(153, 51, 255)') {
				pp++;
				$('#pp').text(pp);
			}
			else if (color == 'rgb(255, 255, 0)') {
				y++;
				$('#y').text(y);
			}
			else if (color == 'rgb(0, 255, 0)') {
				g++;
				$('#g').text(g);
			}
			else if (color == 'rgb(255, 0, 0)')
				r++;
				$('#r').text(r);
		}


		if (b == tganador)
			alert("Ha ganado el color azul"); 
		else if (p == tganador)
			alert("Ha ganado el color rosa");
		else if (pp == tganador)
			alert("Ha ganado el color violeta");
		else if (y == tganador)
			alert("Ha ganado el color amarillo" );
		else if ( g == tganador)
			alert("Ha ganado el color verde");
		else if (r == tganador)
			alert("Ha ganado el color rojo");
	}

	compruebaBomba();

	function compruebaBomba() {
		//socket.emit('bomba', aleatorio);
		socket.on('bomba', function(aleatorio){
			for (var i = 1; i < 49; i++){
				$('#canvas'+i).text("");
			}
			color = $('#canvas'+aleatorio).text("bomba");

	});

		$('li').click(function(){
			var id = $(this).html();
			//for (var i = 1; i < 49; i++){
				//var sit = $('#canvas'+i).html();
				if (id == "bomba")
					alert("boooooooom");
			//}
		});
	}

	$('li').click(function(){
		seccion = this.id;
		socket.emit('click', seccion);
			
	});
	//socket.on('player', function(player){
		//alert(player);
	//});
	
	

	window.onload = function() {
		var c = document.getElementById("canvas1");
		var ctx = c.getContext('2d');
	}

	window.onload = function() {
		var c = document.getElementById("canvas2");
		var ctx = c.getContext('2d');
	}

	window.onload = function() {
		var c = document.getElementById("canvas3");
		var ctx = c.getContext('2d');
	}

	window.onload = function() {
		var c = document.getElementById("canvas4");
		var ctx = c.getContext('2d');
	}

	window.onload = function() {
		var c = document.getElementById("canvas5");
		var ctx = c.getContext('2d');
	}

});