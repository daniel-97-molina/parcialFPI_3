var pokemon;

function cargar(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pokemon = JSON.parse(this.responseText);
      console.log(pokemon)
      mostrarPropiedades();
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/256/", true);
  xhttp.send();
}

function mostrarPropiedades() {
	document.getElementById("name").innerHTML = pokemon.name;
	document.getElementById("id-pokemon").innerHTML = pokemon.id;
	document.getElementById("tipo1").innerHTML = pokemon.types[0].type.name;
	if(pokemon.types.length > 1){
	document.getElementById("tipo2").innerHTML = pokemon.types[1].type.name;
	}
	document.getElementById("image").src = pokemon.sprites.front_default;
	

	
	
	
	
}

































function get(objeto){
	return document.querySelector(objeto);
}

get("#btnEvoluciones").onclick = function(){
	get("#divHabilidades").style.display = "none"
	get("#divEvoluciones").style.display = "block"
}
get("#btnHabilidades").onclick = function(){
	get("#divHabilidades").style.display = "block"
	get("#divEvoluciones").style.display = "none"
}

