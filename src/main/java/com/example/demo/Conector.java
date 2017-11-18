package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Conector {
String url = "usuario.db";
Connection connect;

public void connect(){
	 try {
	     connect = DriverManager.getConnection("jdbc:sqlite:"+url);
	     if (connect!=null) {
	         System.out.println("Conectado");
	     }
	 }catch (SQLException ex) {
	     System.err.println("No se ha podido conectar a la base de datos\n"+ex.getMessage());
	 }
	}
	 public void close(){
	        try {
	            connect.close();
	        } catch (SQLException ex) {
	            Logger.getLogger(Conector.class.getName()).log(Level.SEVERE, null, ex);
	        }
	 }
 public void saveUsuario(String name, String email){
        try {
            PreparedStatement st = connect.prepareStatement("insert into users (name, email) values (?,?)");
            st.setString(1, name);
            st.setString(2, email);
            st.execute();
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
        }
 
    }
 
}