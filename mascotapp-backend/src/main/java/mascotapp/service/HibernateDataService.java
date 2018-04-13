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
		Post post4 = new Post("Perro busca familia", Encoder.encode(dogs.get(0), "jpg"),0,0,"Calle 5 y 159",Category.ADOPCION);
		Post post5 = new Post("Perro encontrado", Encoder.encode(dogs.get(1), "jpg"),0,0,"Calle 5 y 159",Category.ENCONTRADO);
		Post post6 = new Post("Perro perdido", Encoder.encode(dogs.get(2), "jpg"),0,0,"Calle 5 y 159",Category.PERDIDO);
		Post post7 = new Post("Perro callejero busca familia",Encoder.encode(dogs.get(3), "jpg"),0,0,"Calle 5 y 159",Category.ADOPCION);
		
		postDAO.save(post4);
		postDAO.save(post5);
		postDAO.save(post6);
		postDAO.save(post7);
		
		postDAO.save(post1);
		postDAO.save(post2);
		postDAO.save(post3);
	}

}
