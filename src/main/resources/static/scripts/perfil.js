function evaluar(){
	if(document.cookie.length===0){
		location.href = "inicio.html"
	}else{
		document.getElementById("usuarioLogueado").innerHTML = document.cookie.split(",")[1];
		document.getElementById("usuarioLogueado").style.display = "block"
	}
}
evaluar();
setInterval(function(){evaluar()},1000);
