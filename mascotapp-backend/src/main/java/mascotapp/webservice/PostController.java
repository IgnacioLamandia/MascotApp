package mascotapp.webservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	@CrossOrigin
	@RequestMapping(value = "/posts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Post>> getAll() {
         List<Post> posts = this.postService.getAll();
         System.out.println(posts.size());

        if (posts == null) {
            System.out.println("no Tasks found");
            return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }
}
