package persistance;

import java.io.IOException;
import java.util.Collection;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import model.Post;
import service.HibernateDataService;

public class PostDAOTestCase {

	private HibernatePostDAO  dao = new HibernatePostDAO();
	private HibernateDataService service = new HibernateDataService();
	
	@Before
	public void setUp() {
		try {
			service.createInitialData();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void itShouldReturnFourPosts() {
		Collection<Post> posts = this.dao.getAll();		
		Assert.assertEquals(4, posts.size());
	}
}