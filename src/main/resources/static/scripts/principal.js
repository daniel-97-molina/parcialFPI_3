get("#btnLogin").onclick = function() {
  var email = document.getElementById("txtEmailLogin").value;
  var password = document.getElementById("txtPasswordLogin").value;
  var userRequest = new XMLHttpRequest();
  
  userRequest.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		  var respuesta = JSON.parse(this.responseText);
		  console.log("respuesta: "+respuesta);
	  }
  };
  
  userRequest.open('POST', '/loguearse');
  userRequest.send();
}

function RegistrarRequest(){
	  var nombre = document.getElementById("txtNombre").value;
	  var email = document.getElementById("txtEmailResgistro").value;
	  var password = document.getElementById("txtPasswordRegistro").value;
	  var userRequest = new XMLHttpRequest();
	  
	  var xhttp = new XMLHttpRequest();
	  userRequest.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			  var respuesta = JSON.parse(this.responseText);
			  console.log(respuesta);
		  }
	  };
	  userRequest.open('POST', '/logearse');
	  userRequest.send([nombre]);
}