package service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import persistance.HibernatePublicacionDAO;
import model.Categoria;
import model.Encoder;
import model.Publicacion;

@Repository
public class HibernateDataService {
	
	HibernatePublicacionDAO publiDAO = new HibernatePublicacionDAO();
	
	@Autowired
	public HibernateDataService() {
	}

	public void createDatosIniciales() throws IOException {
		List<BufferedImage> imgs= new ArrayList<BufferedImage>();
		File folder = new File("./images");
		File[] listOfFiles = folder.listFiles();

		for (File file : listOfFiles) {
		    if (file.isFile()) {
		        imgs.add(ImageIO.read(file));
		    }
		}
		Publicacion publi1 = new Publicacion("Perro perdido",Encoder.encode(imgs.get(0), "jpg"),0,0,"Calle 5 y 159",Categoria.PERDIDO);
		Publicacion publi2 = new Publicacion("Busco Perro",Encoder.encode(imgs.get(1), "jpg"),0,0,"Calle 5 y 159",Categoria.BUSCO);
		Publicacion publi3 = new Publicacion("Perro lastimado",Encoder.encode(imgs.get(2), "jpg"),0,0,"Calle 5 y 159",Categoria.LASTIMADO);
		Publicacion publi4 = new Publicacion("Perro callejero busca familia",Encoder.encode(imgs.get(3), "jpg"),0,0,"Calle 5 y 159",Categoria.CALLEJERO);
		
		publiDAO.save(publi1);
		publiDAO.save(publi2);
		publiDAO.save(publi3);
		publiDAO.save(publi4);

		
	}

}
