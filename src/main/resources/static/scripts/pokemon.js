var pokemon;
var urlBase = "https://pokeapi.co/api/v2/";
var especie;
var evolucion;
var idEvoluciones = [];
var evolutionArray = [];
var cantidadEv = 0;
var idActual;


function cargar(id) {
  //limpiar controles
  get("#name").innerHTML = "";
  get("#id-pokemon").innerHTML = "";
  get("#tipo1").innerHTML = "";
  get("#divTipo2").style.display = "none";
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
  get("#divEvoluciones").innerHTML = "";
  idEvoluciones = [];
  evolutionArray = [];
  cantidadEv = 0;


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pokemon = JSON.parse(this.responseText);
      console.log(pokemon);
      mostrarPropiedades();
    }
  };
  xhttp.open("GET", urlBase + "pokemon/" + id, true);
  xhttp.send();
  cargarEspecie(id);
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

  for (var i = 0;
    (i < pokemon.abilities.length && i < 5); i++) {
    get("#habilidades").innerHTML += "<h2>" + pokemon.abilities[i].ability.name + "</h2>";
  }
  for (var i = 0;
    (i < pokemon.moves.length && i < 5); i++) {
    get("#movimientos").innerHTML += "<h2>" + pokemon.moves[i].move.name + "</h2>";
  }

}

function cargarEspecie(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      especie = JSON.parse(this.responseText);
      console.log(especie);
      if (especie.habitat) {
        get("#habitat").innerHTML = especie.habitat.name;
      } else {
        get("#habitat").innerHTML = "Desconocido";
      }
      for (var i = 0; i < especie.flavor_text_entries.length; i++) {
        if (especie.flavor_text_entries[i].language.name == "es") {
          var descripcion = especie.flavor_text_entries[i].flavor_text;
          // if(descripcion.length > 195){
          // 	descripcion = descripcion.substring(0,195)+"...";
          // }
          get("#descripcion").innerHTML = descripcion;
          break;
        }
      }
      requestEvoluciones(especie.evolution_chain.url);
    }
  };
  xhttp.open("GET", urlBase + "pokemon-species/" + id, true);
  xhttp.send();
}
/////////////evoluciones///////////////////////
function requestEvoluciones(urlevolucion) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      evolucion = JSON.parse(this.responseText);
      cargarEvoluciones(evolucion);
    }
  };
  xhttp.open("GET", urlevolucion, true);
  xhttp.send();
}

function cargarEvoluciones(evolucion) {
  var tercera = 0;
  var areaDivEvoluciones = document.getElementById('divEvoluciones');
  areaDivEvoluciones.innerHTML = "";
  evolutionArray = evolucion.chain;
  cantidadEv = evolutionArray.evolves_to.length;
  for (var i = -1; i < cantidadEv; i++) {
    if (i < 0) {
      idEvoluciones.push(evolucion.chain.species.url.slice(42, -1));
      EvolucionURL(parseInt(idEvoluciones[0]), areaDivEvoluciones, evolutionArray.species.name);

    } else {
      idEvoluciones.push(evolucion.chain.evolves_to[i].species.url.slice(42, -1));
      EvolucionURL(parseInt(idEvoluciones[i + 1]), areaDivEvoluciones, evolucion.chain.evolves_to[i].species.name);
      tercera = idEvoluciones.length;
    }
  }
  for (var i = 0; i < evolutionArray.evolves_to.length; i++) {
    for (var j = 0; j < evolutionArray.evolves_to[i].evolves_to.length; j++) {
      idEvoluciones.push(evolucion.chain.evolves_to[i].evolves_to[j].species.url.slice(42, -1));
      EvolucionURL(parseInt(idEvoluciones[tercera]), areaDivEvoluciones, evolutionArray.evolves_to[i].evolves_to[j].species.name);
    }
  }
}

//////////////El metodo que esta adentro///////////////////////////////////////////////////////////////

function EvolucionURL(idDeseado, areaDivEvoluciones, nombre) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pokemon = JSON.parse(this.responseText);
      GenerarDivEvolucion(areaDivEvoluciones, pokemon.sprites.front_default, nombre, idDeseado);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + idDeseado, true);
  xhttp.send();
}

/////////////////// Metodo que crea los divs//////////////////////////////////////////////////////////////////

function GenerarDivEvolucion(divPrincipal, ruta, nombre, idDeseado) {
  //var divEvolucion = document.createElement("DIV");
  //var divEvolucionImg = document.createElement("DIV");
  //var divEvolucionName = document.createElement("DIV");
  //var hTitulo = document.createElement("H1");
  //var iImg = document.createElement("IMG");
  //var eName = document.createTextNode(nombre);
  //iImg.setAttribute("src",ruta);
  //divEvolucion.setAttribute("onclick", "nuevoPokemon("+idDeseado+")")
  //hTitulo.appendChild(eName);
  //divEvolucionImg.appendChild(iImg);
  //divEvolucionName.appendChild(hTitulo);
  //divEvolucion.appendChild(divEvolucionImg);
  //divEvolucion.appendChild(divEvolucionName);
  //divPrincipal.appendChild(divEvolucion);

  get("#divEvoluciones").innerHTML += "<div class='pokemonEvolucion' onclick='nuevoPokemon(" + idDeseado + ")' >" +
    "<img src='" + ruta + "'><h2>" + nombre + "</h2></div>";


}

var pokecomply = new Array();
window.onload = function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      for (i = 0; i < 802; i++) {
        pokecomply[i] = String(myObj.results[i].name);
      }
      creadorDeListas(pokecomply);
    }
  };
  xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=802", true);
  xmlhttp.send();
  if (document.cookie.length > 0) {
	  setInterval(function(){actualizarLogin()}, 1000);
    get("#loginRegistro").style.display = "none";
    get("#usuarioLogueado").innerHTML = '<a href="perfil.html">'+document.cookie.split(",")[1]+'</a>';
    get("#usuarioLogueado").style.display = "inline-block";
    get("#register").style.display = "none";
  }
};

function creadorDeListas(pokecomply) {
  for (i = 0; i < 802; i++) {
    var node = document.createElement("OPTION");
    var textnode = document.createTextNode(pokecomply[i]);
    node.appendChild(textnode);
    node.setAttribute("id", i);
    node.setAttribute("name", pokecomply[i]);
    document.getElementById("lista").appendChild(node);
  }
}

function llenarPokemon(e) {
  if (e.keyCode == 13) {
    buscador = document.getElementById("txtBusqueda").value
    if (Existe(pokecomply, buscador)) {
      var optionS = document.getElementsByName(buscador);
      var pokeIdS = optionS[0].getAttribute("id");
      var pokeId = parseInt(pokeIdS) + 1;
      idActual = pokeId;
      cargar(pokeId);
    } else {
      alert("Busqueda no válida")
    }
  }

}

function Existe(array, texto) {
  var tamanio = array.length;
  for (var i = 0; i < tamanio; i++) {
    if (array[i] == texto) {
      return true;
    }
  }
  return false;
}

function nuevoPokemon(requestID) {
  cargar(requestID);
}

function get(objeto) {
  return document.querySelector(objeto);
}

get("#btnEvoluciones").onclick = function() {
  get("#divHabilidades").style.display = "none"
  get("#divEvoluciones").style.display = "block"
};
get("#btnHabilidades").onclick = function() {
  get("#divHabilidades").style.display = "block"
  get("#divEvoluciones").style.display = "none"
};

get("#formRegistro").onsubmit = function(e) {

  var nombre = get("#txtNombre").value;
  var email = document.getElementById("txtEmailRegistro").value;
  var password = document.getElementById("txtPasswordRegistro").value;
  var userRequest = new XMLHttpRequest();
  userRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var respuesta = JSON.parse(this.responseText);
      console.log(respuesta);
      if (respuesta.id === null) {
        get("#errorRegistro").innerHTML = "Correo ya registrado";
        get("#errorRegistro").style.display = "block";
      } else {
        var date = new Date();
        date.setTime(date.getTime() + (15 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = "usuarioLogueado=" + [respuesta.id, respuesta.name, respuesta.email] + expires;
        get("#loginRegistro").style.display = "none";
        get("#usuarioLogueado").innerHTML = '<a href="perfil.html">'+respuesta.name+'</a>';
        get("#usuarioLogueado").style.display = "inline-block";
        get("#register").style.display = "none";
        setInterval(function(){actualizarLogin()}, 1*1000);
      }
    }
  };
  userRequest.open('POST', '/crearUsuario');
  userRequest.setRequestHeader("Content-Type", "application/json");
  userRequest.setRequestHeader("Accept", "application/json");
  userRequest.send(JSON.stringify({
    "id": 0,
    "name": nombre,
    "email": email,
    "contrasena": password
  }));
}

function actualizarLogin(){
	if(document.cookie.length===0){
	get("#loginRegistro").style.display = "inline-block";
    get("#usuarioLogueado").innerHTML = "";
    get("#usuarioLogueado").style.display = "none";
    
	}
}

get("#formLogin").onsubmit = function(e) {
  var email = document.getElementById("txtEmailLogin").value;
  var password = document.getElementById("txtPasswordLogin").value;
  var userRequest = new XMLHttpRequest();
  userRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("responseText:" + this.responseText + "-")
      var respuesta = JSON.parse(this.responseText);
      console.log(respuesta);
      if (respuesta.id === null) {
        e.preventDefault();
        get("#errorLogin").innerHTML = "Contraseña o correo incorrecto";
        get("#errorLogin").style.display = "block";
      } else {
        var date = new Date();
        date.setTime(date.getTime() + (15 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = "usuarioLogueado=" + [respuesta.id, respuesta.name, respuesta.email] + expires;
        get("#loginRegistro").style.display = "none";
        get("#usuarioLogueado").innerHTML = '<a href="perfil.html">'+respuesta.name+'</a>';
        get("#usuarioLogueado").style.display = "inline-block";
        get("#register").style.display = "none";
        setInterval(function(){actualizarLogin()}, 1*1000);
      }
    }
  };
  userRequest.open('POST', '/loguearse');
  userRequest.setRequestHeader("Content-Type", "application/json");
  userRequest.setRequestHeader("Accept", "application/json");
  userRequest.send(JSON.stringify({
    "id": 0,
    "name": "",
    "email": email,
    "contrasena": password
  }));
};

get("#btnFavorito").onclick = function() {
    
    if (document.cookie.length > 0) {
    	this.className = "";
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	
        }
      };
      xhttp.open("POST", "/pokemonFavoritos", true);
			var idUsuario = document.cookie.split(",")[0];
			idUsuario = idUsuario.split("usuarioLogueado=")[1];
			console.log("id:"+idUsuario);
      xhttp.send(idUsuario+","+idActual);
      }else{
    	  alert("debe registrarse");
      }
    };
