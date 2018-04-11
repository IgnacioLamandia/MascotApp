package mascotapp.model;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Post {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	
	public String description;	

	public String image;	
	public float latitude;	
	public float longitude;
	public String address;		
	@Enumerated(EnumType.ORDINAL)
	public Category category;
	
	public Post() {		
	}
	
	public Post(String description, String image, float latitude,
			float longitude, String address, Category category) {
		
		this.description = description;
		this.image = image;
		this.latitude = latitude;
		this.longitude = longitude;
		this.address = address;
		this.category = category;		
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
	
}
