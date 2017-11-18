$('input[type="submit"]').mousedown(function(){
  $(this).css('background', '#2ecc71');
});
$('input[type="submit"]').mouseup(function(){
  $(this).css('background', '#1abc9c');
});

$('#loginform').click(function(){
  $('#login').fadeToggle('slow');
  $(this).toggleClass('green');
});
$('#registerform').click(function(){
  $('#register').fadeToggle('slow');
  $(this).toggleClass('green');
});


$(document).mouseup(function (e)
{
    var container = $(".login");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
        $('#loginform').removeClass('green');
    }
});

//NUESTRO CÓDIGO


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







var pokemon;

function cargar(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      pokemon = JSON.parse(this.responseText);
      console.log("Pokemon: "+pokemon.name);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/25/", true);
  xhttp.send();
}






