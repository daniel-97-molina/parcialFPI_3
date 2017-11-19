package controller;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Conector;
import com.example.demo.Usuario;

@org.springframework.stereotype.Controller

public class Controller {

	@Autowired
	Conector conexion;

	@PostMapping("/crearUsuario")
	public int creandoUsuario(@RequestBody Usuario usuario) {
		conexion.connect();
		int resultado = conexion.saveUsuario(usuario.getName(), usuario.getEmail());
		conexion.close();
		return resultado;
	}

	@PostMapping("/pokemonFavoritos")
	public void favoritos(@RequestBody ArrayList<Object> arreglo) {
		conexion.connect();
		conexion.saveFavoritos(Integer.parseInt(arreglo.get(0).toString()),
				(Integer.parseInt(arreglo.get(1).toString())));
		conexion.close();
		
	}

	@PostMapping("/loguearse")
	public Usuario loguearse(@RequestBody ArrayList<Object> arreglo) {
		conexion.connect();
		Usuario user = conexion.buscarUsuarioByCorreo(arreglo.get(0).toString());
		if(user != null) {
			if(user.getContrasena() == arreglo.get(1).toString()) {
				return user;
			}else {
				return null;
			}
		}
		conexion.close();
		return user;
	}
}




















