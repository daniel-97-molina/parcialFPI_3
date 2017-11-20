package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Component;

@Component
public class Conector {
	String url = "/home/danm/usuario.db";
	Connection connect;

	public void connect() {
		try {
			connect = DriverManager.getConnection("jdbc:sqlite:" + url);
			if (connect != null) {
				System.out.println("Conectado");
			}
		} catch (SQLException ex) {
			System.err.println("No se ha podido conectar a la base de datos\n" + ex.getMessage());
		}
	}

	public void close() {
		try {
			connect.close();
		} catch (SQLException ex) {
			Logger.getLogger(Conector.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public Usuario buscarUsuarioByCorreo(String correo){
	Usuario user = null;
	try{
		PreparedStatement st = connect.prepareStatement("SELECT * FROM users WHERE email=?");
		st.setString(1, correo);
		ResultSet rs = st.executeQuery();
		while (rs.next()) {
			user = new Usuario(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4));
		}
	return user;
	}catch(SQLException ex){
		System.err.println(ex.getMessage());
		return null;
	}
	}
	
	public Usuario loguearse(String email, String contrasena) {
		Usuario user = buscarUsuarioByCorreo(email);
		if(user != null) {
			if(user.getContrasena() == contrasena) {
				return user;
			}
		}
		return user;
	}

	public Usuario saveUsuario(String name, String email, String password) {
		Usuario user = new Usuario(null,null,null,null);
		try {
			if(buscarUsuarioByCorreo(email)==null) {
			PreparedStatement st = connect.prepareStatement("insert into users (name, email, contraseña) values (?,?,?)");
			st.setString(1, name);
			st.setString(2, email);
			st.setString(3, password);
			st.execute();
			user = buscarUsuarioByCorreo(email);
			}else {
				 user = new Usuario(null,null,null,null);
			}
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
			 user = new Usuario(null,null,null,null);
		}
		return user;
	}

	public void saveFavoritos(int id, int id_pokemon) {
		try {
			PreparedStatement st = connect.prepareStatement("insert into users_pokemon (id, id_pokemon) values (?,?)");
			st.setInt(1, id);
			st.setInt(2, id_pokemon);
			st.execute();
		} catch (SQLException ex) {
			System.err.println(ex.getMessage());
		}
	}
}