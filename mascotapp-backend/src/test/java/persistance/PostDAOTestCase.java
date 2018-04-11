package persistance;

import java.util.Collection;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import mascotapp.model.Post;
import mascotapp.persistance.HibernatePostDAO;
import mascotapp.service.HibernateDataService;

public class PostDAOTestCase {

	private HibernatePostDAO  dao = new HibernatePostDAO();
	private HibernateDataService service = new HibernateDataService();
	
	@Before
	public void setUp() {
			service.createInitialData();
	}
	
	@Test
	public void itShouldReturnFourPosts() {
		Collection<Post> posts = this.dao.getAll();		
		Assert.assertEquals(4, posts.size());
	}
}