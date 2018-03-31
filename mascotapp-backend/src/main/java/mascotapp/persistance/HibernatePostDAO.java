package mascotapp.persistance;

import org.springframework.stereotype.Repository;

import mascotapp.model.Post;

@Repository
public class HibernatePostDAO extends GenericDAO<Post> {	
	public HibernatePostDAO() {
		super(Post.class);
	}
}
