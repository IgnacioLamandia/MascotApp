package persistance;

import org.springframework.stereotype.Repository;

import model.Post;

@Repository
public class HibernatePostDAO extends GenericDAO<Post> {	
	public HibernatePostDAO() {
		super(Post.class);
	}
}
