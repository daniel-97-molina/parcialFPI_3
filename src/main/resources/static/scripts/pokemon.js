var pokemon;

function cargar(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pokemon = JSON.parse(this.responseText);
      console.log(pokemon);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/25/", true);
  xhttp.send();
}

function mostrarPropiedades() {
	document.getElementById("name").innerHTML = pokemon.name;
	document.getElementById("id-pokemon").innerHTML = pokemon.id;
	document.getElementById("tipo1").innerHTML = pokemon.types[0].name;
	document.getElementById("tipo1").innerHTML = pokemon.types[0].name;

	
	
	
	
}