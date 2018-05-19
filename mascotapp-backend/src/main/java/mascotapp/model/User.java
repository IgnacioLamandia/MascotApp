package mascotapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="`users`")
public class User {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	public String name;
	public String email;
	public String external_id;

	public User() {		
	}

	public User(String name, String email, String external_id) {
		this.name = name;
		this.email = email;
		this.external_id = external_id;
	}
}
/*	
	public void changeState(User otherUser, Post post, State state) {
		post.setState(state);
		post.request(this, otherUser);
	}
*/

