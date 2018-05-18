package mascotapp.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import mascotapp.model.Category;
import mascotapp.model.Comment;
import mascotapp.model.Encoder;
import mascotapp.model.Post;
import mascotapp.model.poststates.CollectPostState;
import mascotapp.model.poststates.RequestPostState;
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
		Post post1 = new Post("Gato encontrado","se lo encontro por berazategui", Encoder.encode(cats.get(0), "jpg"),
			-34.785178f,-58.200352f,"Ranelagh, Buenos Aires, Argentina",Category.ENCONTRADO);
		Post post2 = new Post("Gato perdido", "se lo vio por ultima vez en bernal", Encoder.encode(cats.get(1), "jpg"),
			-34.785178f,-58.200352f, "Ranelagh, Buenos Aires, Argentina",Category.PERDIDO);
		Post post3 = new Post("Gato busca familia","se busca quien pueda adoptar a beto", Encoder.encode(cats.get(2), "jpg"),
			-34.785178f,-58.200352f, "Ranelagh, Buenos Aires, Argentina",Category.ADOPCION);

		//perros
		Post post4 = new Post("Guido es increíble","Se entrega castrado, desparasitado y con contrato de adopción. Es tamaño chico.\n" + 
				"Veni a conocer al bombón de GUIDO en nuestra próxima jornada de visita!", 
				Encoder.encode(dogs.get(0), "jpg"),-34.785178f,-58.200352f,"Ranelagh, Buenos Aires, Argentina",Category.ADOPCION);
		Post post5 = new Post("Perro encontrado", "Fue encontrado en el centro de quilmes con collar gris", 
				Encoder.encode(dogs.get(1), "jpg"),-34.785178f,-58.200352f,"Ranelagh, Buenos Aires, Argentina",Category.ENCONTRADO);
		Post post6 = new Post("Perro perdido", "se lo vio por ultima vez en berazategui", Encoder.encode(dogs.get(2), "jpg"),
				-34.785178f,-58.200352f,"Ranelagh, Buenos Aires, Argentina",Category.PERDIDO);
		Post post7 = new Post("Zuri Nuestra bella princesa", "Zuri ya esta lista para dejar el refu y llenar de amor a una familia, tamaño de mediano a grande, se entrega castrada y con contrato de adopción!\n" + 
				"Veni a conocer a ZURI en nuestra próxima jornada de visita!",
				Encoder.encode(dogs.get(3), "jpg"),-34.785178f,-58.200352f, "Ranelagh, Buenos Aires, Argentina",Category.ADOPCION);
		
		Comment comment1p2 = new Comment("Hola, me parece que lo vi por berazategui.","Jose", "Jose@gmail.com");
		Comment comment2p2 = new Comment("yo lo vi por el centro.","Pedro","pedro@gmail.com");
		post2.addComment(comment1p2);
		post2.addComment(comment2p2);
		
		Comment comment1p6 = new Comment("Hola, creo que ese es mi perro. Me contactare con vos por privado.", "Rosario", "rosario@outlook.com");
		post6.addComment(comment1p6);
		
//		post2.setState(new RequestPostState());
//		post3.setState(new CollectPostState());
//		post6.setState(new RequestPostState());

		postDAO.save(post4);
		postDAO.save(post5);
		postDAO.save(post6);
		postDAO.save(post7);
		postDAO.save(post1);
		postDAO.save(post2);
		postDAO.save(post3);

	}

}
