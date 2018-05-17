package mascotapp.model.poststates;

import javax.persistence.Entity;

import mascotapp.model.Post;
import mascotapp.model.User;

@Entity
public class NewPostState extends State {

	@Override
	public void handle(User owner, User otherUser, Post post) {
		
	}

}
