package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Conector;
import com.example.demo.Usuario;

@org.springframework.stereotype.Controller

public class Controller {

	@Autowired 
	Conector conexion;
	
	@PostMapping("/crearUsuario")
	public ResponseEntity creandoUsuario(@RequestBody Usuario usuario) {
		Usuario user = conexion.saveUsuario(usuario.getName(), usuario.getEmail());
		
	}
	
}
