package service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import model.Category;
import model.Encoder;
import model.Post;
import persistance.HibernatePostDAO;

public class HibernateDataService {
	
	HibernatePostDAO postDAO = new HibernatePostDAO();

	public void createInitialData() throws IOException {
		List<BufferedImage> imgs= new ArrayList<BufferedImage>();
		File folder = new File("./images");
		File[] listOfFiles = folder.listFiles();

		for (File file : listOfFiles) {
		    if (file.isFile()) {
		        imgs.add(ImageIO.read(file));
		    }
		}
		
		Post post1 = new Post("Perro perdido",Encoder.encode(imgs.get(0), "jpg"),0,0,"Calle 5 y 159",Category.PERDIDO);
		Post post2 = new Post("Busco Perro",Encoder.encode(imgs.get(1), "jpg"),0,0,"Calle 5 y 159",Category.BUSCO);
		Post post3 = new Post("Perro lastimado",Encoder.encode(imgs.get(2), "jpg"),0,0,"Calle 5 y 159",Category.LASTIMADO);
		Post post4 = new Post("Perro callejero busca familia",Encoder.encode(imgs.get(3), "jpg"),0,0,"Calle 5 y 159",Category.CALLEJERO);
		
		postDAO.save(post1);
		postDAO.save(post2);
		postDAO.save(post3);
		postDAO.save(post4);				
	}

}
