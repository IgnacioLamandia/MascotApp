package mascotapp.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

@Entity
public class Post {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	public String title;
	public String description;	
	@Lob
	public String image;	
	public float latitude;	
	public float longitude;
	public String address;		
	@Enumerated(EnumType.ORDINAL)
	public Category category;
/*	
	@OneToMany(fetch = FetchType.EAGER,cascade=CascadeType.ALL)
	public List<Comment> comments;
*/	
	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	public Set<Comment> comments;
	
	public Post() {		
	}
	
	public Post(String title, String description, String image, float latitude,
			float longitude, String address, Category category) {
		
		this.title = title;
		this.description = description;
		this.image = image;
		this.latitude = latitude;
		this.longitude = longitude;
		this.address = address;
		this.category = category;		
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
	
	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}
	
	public void addComment(Comment newComment) {
		this.comments.add(newComment);		
	}
}
