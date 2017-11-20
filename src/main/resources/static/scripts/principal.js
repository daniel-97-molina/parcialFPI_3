window.onload = function(){
	if(document.cookie.length>0){
		get("#loginRegistro").style.display = "none";
		get("#usuarioLogueado").innerHTML = document.cookie.split(",")[1];
		get("#usuarioLogueado").style.display = "inline-block";
		get("#register").style.display ="none";
	}
};


get("#formRegistro").onsubmit = function(e){
	  
	  var nombre = get("#txtNombre").value;
	  var email = document.getElementById("txtEmailRegistro").value;
	  var password = document.getElementById("txtPasswordRegistro").value;
	  var userRequest = new XMLHttpRequest();
	  userRequest.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			  console.log(this.responseText);
			  var respuesta = JSON.parse(this.responseText);
			  console.log(respuesta);
			  if(respuesta.id === null){
				  get("#errorRegistro").innerHTML = "Correo ya registrado";
				  get("#errorRegistro").style.display = "block";
			  }else{
			  var date = new Date();
			  date.setTime(date.getTime()+(3*60*1000));
			  var expires = "; expires="+date.toGMTString();
			  document.cookie = "usuarioLogueado="+[respuesta.id,respuesta.name,respuesta.email]+expires;
			  get("#loginRegistro").style.display = "none";
			  get("#usuarioLogueado").innerHTML = respuesta.name;
			  get("#usuarioLogueado").style.display = "inline-block";
			  get("#register").style.display ="none";
			  }
		  }
	  };
	  userRequest.open('POST', '/crearUsuario');
	  userRequest.setRequestHeader("Content-Type", "application/json");
	  userRequest.setRequestHeader("Accept", "application/json");
	  userRequest.send(JSON.stringify({"id": 0, "name": nombre, "email": email, "contrasena": password}));
}

get("#formLogin").onsubmit = function(e){
	  var email = document.getElementById("txtEmailLogin").value;
	  var password = document.getElementById("txtPasswordLogin").value;
	  var userRequest = new XMLHttpRequest();
	  userRequest.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			  console.log("responseText:"+this.responseText+"-")
			  var respuesta = JSON.parse(this.responseText);
			  console.log(respuesta);
			  if(respuesta.id===null){
				  e.preventDefault();
				  get("#errorLogin").innerHTML = "Contraseña o correo incorrecto";
				  get("#errorLogin").style.display = "block";
			  }else{
			  
			  var date = new Date();
			  date.setTime(date.getTime()+(3*60*1000));
			  var expires = "; expires="+date.toGMTString();
			  document.cookie = "usuarioLogueado="+[respuesta.id,respuesta.name,respuesta.email]+expires;
			  get("#loginRegistro").style.display = "none";
			  get("#usuarioLogueado").innerHTML = respuesta.name;
			  get("#usuarioLogueado").style.display = "inline-block";
			  get("#login").style.display ="none";
			  }
		  }
	  };
	  userRequest.open('POST', '/loguearse');
	  userRequest.setRequestHeader("Content-Type", "application/json");
	  userRequest.setRequestHeader("Accept", "application/json");
	  userRequest.send(JSON.stringify({"id": 0, "name": "", "email": email, "contrasena": password}));
}


















