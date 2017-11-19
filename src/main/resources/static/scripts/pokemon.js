var pokemon;
var urlBase = "https://pokeapi.co/api/v2/";
var especie;
var evolucion;

function cargar(id) {
	//limpiar controles
	get("#name").innerHTML = "";
	get("#id-pokemon").innerHTML = "";
	get("#tipo1").innerHTML = "";
	get("#divTipo2").style.display= "none";
	get("#image").src = "imagenes/cargando.gif";
	get("#altura").innerHTML = "";
	get("#peso").innerHTML = "";
	get("#habilidades").innerHTML = "";
	get("#movimientos").innerHTML = "";
	get("#habitat").innerHTML = "";
	get("#descripcion").innerHTML = "";
	get("#inicio").style.display = "none";
	get("#layout-izquierda").style.display = "block";
	get("#layout-derecha").style.display = "block";
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			pokemon = JSON.parse(this.responseText);
			console.log(pokemon);
			mostrarPropiedades();
			cargarEspecie(id);
		}
	};
	xhttp.open("GET", urlBase + "pokemon/" + id, true);
	xhttp.send();
}

function mostrarPropiedades() {
	
	get("#name").innerHTML = pokemon.name;
	get("#id-pokemon").innerHTML = pokemon.id;
	get("#tipo1").innerHTML = pokemon.types[0].type.name;
	if (pokemon.types.length > 1) {
		get("#divTipo2").style.display = "inline-block";
		get("#tipo2").innerHTML = pokemon.types[1].type.name;
	}
	get("#image").src = pokemon.sprites.front_default;
	get("#altura").innerHTML = "Altura: " + pokemon.height / 10 + " m";
	get("#peso").innerHTML = "Peso: " + pokemon.weight / 10 + " kg";

	for (var i = 0; (i < pokemon.abilities.length && i<5); i++) {
		get("#habilidades").innerHTML += "<h2>"+ pokemon.abilities[i].ability.name + "</h2>";
	}
	for (var i = 0; (i < pokemon.moves.length && i<5); i++) {
		get("#movimientos").innerHTML += "<h2>"+ pokemon.moves[i].move.name + "</h2>";
	}

}

function cargarEspecie(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			especie = JSON.parse(this.responseText);
			console.log(especie);
			if(especie.habitat){
			get("#habitat").innerHTML = especie.habitat.name;
			}else{
				get("#habitat").innerHTML = "Desconocido";
			}
			for (var i = 0; i < especie.flavor_text_entries.length; i++) {
				if (especie.flavor_text_entries[i].language.name == "es") {
					var descripcion = especie.flavor_text_entries[i].flavor_text;
					if(descripcion.length > 195){
						descripcion = descripcion.substring(0,195)+"...";
					}
					get("#descripcion").innerHTML = descripcion; 
					break;
				}
			}
			//cargarEvoluciones(especie.evolution_chain.url);
		}
	};
	xhttp.open("GET", urlBase + "pokemon-species/" + id, true);
	xhttp.send();
}

function cargarEvoluciones(path) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			evolucion = JSON.parse(this.responseText);
			console.log(evolucion);
			if (especie.habitat != null && especie.habitat != "undefined") {
				$("#specie").innerHTML = especie.habitat.name;
			} else {
				$("#specie").innerHTML = "Desconocido";
			}

			// Para la generacion
			$("#generacion").innerHTML = especie.generation.name;

			// Para la evolucion 1
			$("#evolucion1").innerHTML = evolucion.chain.species.name;
			aEvoluciones[0] = evolucion.chain.species.url.slice(42, -1);
			iContador = 1;
			console.log("urlEvolucion 1:  " + aEvoluciones[0]);
		}
	};
	xhttp.open("GET", path, true);
	xhttp.send();
}

function get(objeto) {
	return document.querySelector(objeto);
}

get("#btnEvoluciones").onclick = function() {
	get("#divHabilidades").style.display = "none"
	get("#divEvoluciones").style.display = "block"
}
get("#btnHabilidades").onclick = function() {
	get("#divHabilidades").style.display = "block"
	get("#divEvoluciones").style.display = "none"
}

























