package persistance;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import mascotapp.model.Category;
import mascotapp.model.Comment;
import mascotapp.model.Post;
import mascotapp.model.User;
import mascotapp.service.UserService;

public class UserServiceTest {
	
	private UserService service;
	
	@Before
	public void setUp() {
		service = new UserService();		
	}
	
	@Test
	public void itShouldBePossibleToSaveAnUser() {			
		User anUser = new User("test name", "test@email.com", "12345", new HashSet<Post>());
		this.service.save(anUser);
		List<User> users = this.service.getAll();	
		User savedUser = users.get(0);
		Assert.assertEquals(1, users.size());
		Assert.assertEquals("test name", savedUser.name);
		Assert.assertEquals("test@email.com", savedUser.email);
		Assert.assertEquals("12345", savedUser.external_id);
		Assert.assertEquals(0, savedUser.posts.size());
	}
	
	@Test
	public void itShouldBePossibleToSaveAnUserWithAPost() {	
		Set<Comment> comments = new HashSet<Comment>();
		comments.add(new Comment("comment text", "name", "email@email.com"));
		
		Post aPost = new Post("title", "description", "image", 1f,
				2f, "address", Category.ENCONTRADO);
		aPost.setComments(comments);
		Set<Post> posts = new HashSet<Post>();
		posts.add(aPost);
		
		User anUser = new User("test name", "test@email.com", "12345", posts);
		this.service.save(anUser);
		
		List<User> users = this.service.getAll();	
		User savedUser = users.get(0);
		Assert.assertEquals(1, users.size());
		Assert.assertEquals("test name", savedUser.name);
		Assert.assertEquals("test@email.com", savedUser.email);
		Assert.assertEquals("12345", savedUser.external_id);
		Assert.assertEquals(1, savedUser.posts.size());
		
		Optional<Post> optionalPost = savedUser.posts.stream().findFirst();
		Post savedPost = optionalPost.get();
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
	
	@Test
	public void itShouldBePossibleToObtainAUserByHisId() {			
		User anUser = new User("test name", "test@email.com", "12345", new HashSet<Post>());
		this.service.save(anUser);
		User savedUser = this.service.getById(anUser.id);
		Assert.assertEquals("test name", savedUser.name);
		Assert.assertEquals("test@email.com", savedUser.email);
		Assert.assertEquals("12345", savedUser.external_id);
		Assert.assertEquals(0, savedUser.posts.size());
	}
	
	@Test
	public void itShouldBePossibleToObtainAUserByHisExternalId() {			
		User anUser = new User("test name", "test@email.com", "12345", new HashSet<Post>());
		this.service.save(anUser);
		User savedUser = this.service.getByExternalId("12345");
		Assert.assertEquals("test name", savedUser.name);
		Assert.assertEquals("test@email.com", savedUser.email);
		Assert.assertEquals("12345", savedUser.external_id);
		Assert.assertEquals(0, savedUser.posts.size());
	}
	
	@Test 
	public void itShouldNotBePossibleToCreateTwoUsersWithTheSameExternalId() {			
		User anUser = new User("test name", "test@email.com", "12345", new HashSet<Post>());
		this.service.save(anUser);		
		User anUser2 = new User("test name 2", "test@email.com.ar", "12345", new HashSet<Post>());
		this.service.upsertUser(anUser2);
		
		List<User> savedUsers = this.service.getAll();
		Assert.assertEquals(1, savedUsers.size());
	}
	
	@After
	public void dropAll() {
		service.deleteAll();
	}
}
