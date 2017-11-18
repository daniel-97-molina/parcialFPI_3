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
		int user = conexion.saveUsuario(usuario.getName(), usuario.getEmail());
		return user;
	}
	
	@PostMapping("/pokemonFavoritos")
	public void ResponseEntity (@RequestBody ArrayList arreglo) {
		conexion.saveFavoritos(Integer.parseInt(arreglo.get(0).toString()), (Integer.parseInt(arreglo.get(1).toString())));
		}
	}
	