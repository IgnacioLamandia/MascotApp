package mascotapp.webservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mascotapp.model.Category;
import mascotapp.model.Comment;
import mascotapp.model.Post;
import mascotapp.model.User;
import mascotapp.service.PostService;
import mascotapp.service.UserService;

@CrossOrigin
@RestController
public class PostController {

	@Autowired
	PostService postService;
	
	@Autowired
	UserService userService;

	@RequestMapping(value = "/posts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Post>> getAll() {
		List<Post> posts = this.postService.getAll();
		if (posts.isEmpty() || posts == null) {
			return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/fromUser/{idUser}/posts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Post>> getAllFromUser(@PathVariable("idUser") String id) {
		List<Post> posts = this.postService.getAllFromUser(id);
		if (posts.isEmpty() || posts == null) {
			return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@RequestMapping(value = "/{idUser}/posts", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Void> savePost(@RequestBody Post post, @PathVariable("idUser") String id) throws Exception {
		User user = this.userService.getByExternalId(id);
		post.setCreator(user);
		this.postService.save(post);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/post/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> getPost(@PathVariable("id") Long id) {
        System.out.println("Fetching User with id " + id);
         Post post = this.postService.getById(id);
        if (post == null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/post/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Post> deletePost(@PathVariable("id") Long id) {
		Post post = postService.getById(id);
		if (post == null) {
			return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
		}
		postService.delete(id);
		return new ResponseEntity<Post>(HttpStatus.OK);
	}

	@RequestMapping(value = "/post/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Post> updatePost(@PathVariable("id") Long id, @RequestBody Post post) {
		Post currentPost = postService.getById(id);
		if (currentPost == null) {
			return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
		}
		
		currentPost.setTitle(post.title);
		currentPost.setDescription(post.description);
		currentPost.setImage(post.image);
		currentPost.setLatitude(post.latitude);
		currentPost.setLongitude(post.longitude);
		currentPost.setAddress(post.address);
		currentPost.setCategory(post.category);
		currentPost.setComments(post.comments);

		postService.update(currentPost);
		return new ResponseEntity<Post>(currentPost, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/posts/{category}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Post>> getAllByCategory(@PathVariable("category") Category category) {
		List<Post> posts = this.postService.getAllByCategory(category);
		if (posts.isEmpty() || posts == null) {
			return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}
	
	 
	  @RequestMapping(value = "/post/{id}/newComment", method = RequestMethod.PUT) 
	  public ResponseEntity<Post> newCommentPost(@PathVariable("id") Long id, @RequestBody Comment comment) { 
	    Post currentPost = postService.getById(id); 
	    if (currentPost == null) { 
	      return new ResponseEntity<Post>(HttpStatus.NOT_FOUND); 
	    } 
	    Comment newComment = new Comment(comment.text, comment.name, comment.email); 
	    currentPost.addComment(newComment); 
	    postService.update(currentPost); 
	    return new ResponseEntity<Post>(currentPost, HttpStatus.OK); 
	  } 
}

