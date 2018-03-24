package model;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Publicacion {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	
	public String descripcion;
	
	@Lob
	public String imagen;
	
	public float latitud;
	
	public float longitud;
	
	public String direccion;
	
	
	@Enumerated(EnumType.ORDINAL)
	public Categoria categoria;
	
	public Publicacion() {
		
	}
	
	public Publicacion(String desc,String img,float lat,float lon,String direcc,Categoria cat) {
		descripcion = desc;
		imagen = img;
		latitud = lat;
		longitud = lon;
		direccion = direcc;
		categoria = cat;
		
	}
	
	public Publicacion(String desc,float lat,float lon,String direcc, Categoria cat) {
		descripcion = desc;
		latitud = lat;
		longitud = lon;
		direccion = direcc;
		categoria = cat;
	}

}
