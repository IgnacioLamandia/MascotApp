package mascotapp.webservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    public ResponseEntity<Void> savePost(@RequestBody Post post) throws Exception{
         
		this.postService.save(post);         
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
