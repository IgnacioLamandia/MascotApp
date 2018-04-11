package mascotapp.service;

import mascotapp.model.Category;
import mascotapp.model.Post;
import mascotapp.persistance.HibernatePostDAO;

public class HibernateDataService {
	
	HibernatePostDAO postDAO = new HibernatePostDAO();

	public void createInitialData() {
		
		Post post1 = new Post("Perro perdido","https://cdn.pixabay.com/photo/2014/03/14/20/13/dog-287420__340.jpg",0,0,"Calle 5 y 159",Category.Perdido);
		Post post2 = new Post("Busco Perro","https://cdn.pixabay.com/photo/2018/03/18/11/38/animalia-3236468__340.jpg",0,0,"Calle 5 y 159",Category.Perdido);
		Post post3 = new Post("Perro lastimado","https://cdn.pixabay.com/photo/2015/11/17/13/13/dogue-de-bordeaux-1047521__340.jpg",0,0,"Calle 5 y 159",Category.Adopcion);
		Post post4 = new Post("Perro callejero busca familia","https://cdn.pixabay.com/photo/2017/03/28/18/51/dog-2183017__340.jpg",0,0,"Calle 5 y 159",Category.Adopcion);
		Post post5 = new Post("Gato busca familia","https://cdn.pixabay.com/photo/2017/09/19/20/26/cat-2766503__340.jpg",0,0,"Bernal",Category.Perdido);
		Post post6 = new Post("Gato encontrado con collar","https://cdn.pixabay.com/photo/2017/09/19/20/26/cat-2766503__340.jpg",0,0,"Bernal",Category.Encontrado);

		postDAO.save(post1);
		postDAO.save(post2);
		postDAO.save(post3);
		postDAO.save(post4);
		postDAO.save(post5);
		postDAO.save(post6);
	}

}
