function loginRequest(){
  var userLoging = document.getElementById("txtemaillogin").value;
  var userPass = document.getElementById("txtpasswordlogin").value;
  var userRequest = new XMLHttpRequest();
  userRequest.open('POST', '/logearse');
  userRequest.onload = function() {
    if (userRequest.status >= 200 && userRequest.status < 400) {
      var userData = JSON.parse(userRequest.responseText);
    } else {
      console.log("Se conectó con el servidor pero ocurrió un error");
    }
  };
    userRequest.onerror = function() {
      console.log("Error al conectar con el servidor");
    };
    userRequest.send();
  }


function RegistrarRequest(){
	  var userPass = document.getElementById("txtnombre").value;
	  var userLoging = document.getElementById("txtemailresgistro").value;
	  var userPass = document.getElementById("txtpasswordresgistro").value;
	  var userRequest = new XMLHttpRequest();
	  userRequest.open('POST', '/crearUsuario');
	  userRequest.onload = function() {
	    if (userRequest.status >= 200 && userRequest.status < 400) {
	      var userData = JSON.parse(userRequest.responseText);
	      
	    } else {
	      console.log("Se conectó con el servidor pero ocurrió un error");
	    }
	  };
	    userRequest.onerror = function() {
	      console.log("Error al conectar con el servidor");
	    };
	    userRequest.send();
	  }