package persistance;

import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import mascotapp.model.Category;
import mascotapp.model.Comment;
import mascotapp.model.Post;
import mascotapp.service.HibernateDataService;
import mascotapp.service.PostService;

public class PostServiceTest {

	private HibernateDataService service;
	private PostService postService;
	
	@Before
	public void setUp() {
		postService = new PostService();		
	}
	
	@Test
	public void itShouldReturnSevenPosts() {
		this.createTestPosts(); 
		Collection<Post> posts = this.postService.getAll();		
		Assert.assertEquals(7, posts.size());
	}
	
	@Test
	public void itShouldBePossibleToSaveAPost() {	
		Set<Comment> comments = new HashSet<Comment>();
		comments.add(new Comment("comment text", "name", "email"));
		
		Post aPost = new Post("title", "description", "image", 1f,
				2f, "address", Category.ENCONTRADO);
		aPost.setComments(comments);
		this.postService.save(aPost);
		
		List<Post> posts = this.postService.getAll();	
		Post savedPost = posts.get(0);
		Assert.assertEquals(1, posts.size());
		Assert.assertEquals("title", savedPost.title);
		Assert.assertEquals("description", savedPost.description);
		Assert.assertEquals("image", savedPost.image);
		Assert.assertEquals(1f, savedPost.latitude, 0);
		Assert.assertEquals(2f, savedPost.longitude, 0);
		Assert.assertEquals("address", savedPost.address);
		Assert.assertEquals(Category.ENCONTRADO, savedPost.category);
		Assert.assertEquals(1, savedPost.comments.size());
	}
	
	public void createTestPosts() {
		service = new HibernateDataService();
		
		try {
			service.createInitialData();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@After
	public void dropAll() {
		postService.deleteAll();
	}	
}