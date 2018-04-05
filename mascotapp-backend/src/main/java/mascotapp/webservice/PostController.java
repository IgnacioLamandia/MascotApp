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

import mascotapp.model.Post;
import mascotapp.service.PostService;

@CrossOrigin
@RestController
public class PostController {

	@Autowired
	PostService postService;

	@RequestMapping(value = "/posts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Post>> getAll() {
		List<Post> posts = this.postService.getAll();
		if (posts.isEmpty() || posts == null) {
			return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@RequestMapping(value = "/posts", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Void> savePost(@RequestBody Post post) throws Exception {

		this.postService.save(post);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/post", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<String> createPost(@RequestBody Post input) {
		Post post = new Post(input.description, input.image, 0f, 0f, input.address, input.category);
		this.postService.save(post);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@RequestMapping(value = "/post/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Post> deletePost(@PathVariable("id") long id) {
		Post post = postService.getById(id);
		if (post == null) {
			return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
		}
		postService.delete(id);
		return new ResponseEntity<Post>(HttpStatus.OK);
	}

	@RequestMapping(value = "/post/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Post> updatePost(@PathVariable("id") long id, @RequestBody Post post) {
		Post currentPost = postService.getById(id);
		if (currentPost == null) {
			return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
		}
		currentPost.setDescription(post.description);
		currentPost.setImage(post.image);
		currentPost.setLatitude(post.latitude);
		currentPost.setLongitude(post.longitude);
		currentPost.setAddress(post.address);
		currentPost.setCategory(post.category);

		postService.update(currentPost);
		return new ResponseEntity<Post>(currentPost, HttpStatus.OK);
	}
}
