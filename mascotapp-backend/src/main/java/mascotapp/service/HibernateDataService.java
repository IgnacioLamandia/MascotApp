package mascotapp.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import mascotapp.model.Category;
import mascotapp.model.Encoder;
import mascotapp.model.Post;
import mascotapp.persistance.HibernatePostDAO;

public class HibernateDataService {
	
	HibernatePostDAO postDAO = new HibernatePostDAO();

	public void createInitialData() throws IOException {
		
		List<BufferedImage> dogs= new ArrayList<BufferedImage>();
		List<BufferedImage> cats= new ArrayList<BufferedImage>();
		
		File dogsFolder = new File("./images/dogs");
		File catsFolder = new File("./images/cats");
		
		File[] listOfDogs = dogsFolder.listFiles();
		File[] listOfCats = catsFolder.listFiles();

		for (File file : listOfDogs) {
		    if (file.isFile()) {
		        dogs.add(ImageIO.read(file));
		    }
		}
		
		for (File file : listOfCats) {
		    if (file.isFile()) {
		        cats.add(ImageIO.read(file));
		    }
		}
		
		//gatos
		Post post1 = new Post("Gato encontrado", Encoder.encode(cats.get(0), "jpg"),0,0,"Quilmes",Category.ENCONTRADO);
		Post post2 = new Post("Gato perdido", Encoder.encode(cats.get(1), "jpg"),0,0,"Bernal",Category.PERDIDO);
		Post post3 = new Post("Gato busca familia", Encoder.encode(cats.get(2), "jpg"),0,0,"Solano",Category.ADOPCION);

		//perros
		Post post4 = new Post("Guido es increíble, ya esta super listo para dejar el refu!! se entrega castrado, desparasitado y con contrato de adopción. Es tamaño chico.\n" + 
				"Veni a conocer al bombón de GUIDO en nuestra próxima jornada de visita!", Encoder.encode(dogs.get(0), "jpg"),0,0,"Bernal",Category.ADOPCION);
		Post post5 = new Post("Fue encontrado en el centro de quilmes con collar gris", Encoder.encode(dogs.get(1), "jpg"),0,0,"Quilmes",Category.ENCONTRADO);
		Post post6 = new Post("Perro perdido", Encoder.encode(dogs.get(2), "jpg"),0,0,"Berazategui",Category.PERDIDO);
		Post post7 = new Post("Zuri Nuestra bella princesa ya esta lista para dejar el refu y llenar de amor a una familia, tamaño de mediano a grande, se entrega castrada y con contrato de adopción!\n" + 
				"Veni a conocer a ZURI en nuestra próxima jornada de visita!",Encoder.encode(dogs.get(3), "jpg"),0,0,"Varela",Category.ADOPCION);
		
		postDAO.save(post4);
		postDAO.save(post5);
		postDAO.save(post6);
		postDAO.save(post7);
		
		postDAO.save(post1);
		postDAO.save(post2);
		postDAO.save(post3);
	}

}
