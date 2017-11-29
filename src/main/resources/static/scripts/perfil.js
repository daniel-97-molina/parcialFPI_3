

var urlBase = "https://pokeapi.co/api/v2/";

function evaluar(){
	if(document.cookie.length===0){
		location.href = "inicio.html"
	}else{
		document.getElementById("usuarioLogueado").innerHTML = document.cookie.split(",")[1];
		document.getElementById("usuarioLogueado").style.display = "inline-block"
	}
}
evaluar();


if(document.cookie.length>0){

	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        	console.log(this.responseText);
        	ids = this.responseText.split(",");
        	for(var i = 0; i< ids.length-1; i++){
        	console.log(ids[i]);
        	mostrar(ids[i]);
        	}
        }
      };
	  var idUsuario = document.cookie.split(",")[0].split("usuarioLogueado=")[1];
	  request.open("GET", "/favoritosByUsuario/"+idUsuario, true);
	  console.log(idUsuario);
	  request.send();
}

function mostrar(idPok) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      pokemon = JSON.parse(this.responseText);
	      document.getElementById("contenedor").innerHTML += `<div class="divContenedor">
			<div class="titulo"><h2 class="tituloPerfil">${pokemon.name}</h2></div>
			<img src="${pokemon.sprites.front_default}">
		</div>`;
	    }
	  };
	  xhttp.open("GET", urlBase + "pokemon/" + idPok, true);
	  xhttp.send();
	  }

setInterval(function(){evaluar();},1000);
