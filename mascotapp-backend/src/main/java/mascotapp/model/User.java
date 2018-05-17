package mascotapp.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import mascotapp.model.poststates.State;

@Entity
public class User {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	public String name;
	public String email;
	public String external_id;
	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	public Set<Post> posts;

	public User() {		
	}

	public User(String name, String email, String external_id, Set<Post> posts) {
		this.name = name;
		this.email = email;
		this.external_id = external_id;
		this.posts = posts;
	}
	
	public void changeState(User otherUser, Post post, State state) {
		post.setState(state);
		post.request(this, otherUser);
	}
}
