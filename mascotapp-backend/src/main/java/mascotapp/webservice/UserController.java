package mascotapp.webservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import mascotapp.model.User;
import mascotapp.service.UserService;

@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Void> saveUser(@RequestBody User user) throws Exception {
		this.userService.save(user);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
}
