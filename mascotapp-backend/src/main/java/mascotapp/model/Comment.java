package mascotapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
	
	@Id @GeneratedValue 
	public Long id;
	public String text;
	public String name;
	public String email;
	
	public Comment() {}
	
	public Comment(String text, String name, String email) {
		this.text = text;
		this.name = name;
		this.email = email;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
