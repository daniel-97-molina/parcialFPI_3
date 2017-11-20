package com.example.demo;

public class Usuario {
private Integer id;
private String  name;
private String email;
private String contrasena;


public Usuario(Integer id, String name, String email, String contrasena) {
	this.id= id;
	this.name = name;
	this.email = email;
	this.contrasena = contrasena;
}
public Usuario() {}














public String getContrasena() {
	return contrasena;
}

public void setContrasena(String contrasena) {
	this.contrasena = contrasena;
}

public Integer getId() {
	return id;
}

public void setId(Integer id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}


}
