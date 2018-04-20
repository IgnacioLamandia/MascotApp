package mascotapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
	
	@Id @GeneratedValue 
	public Long id;
	private String text;
	
	public Comment() {}
	
	public Comment(String text) {
		this.text = text;
	}

}
