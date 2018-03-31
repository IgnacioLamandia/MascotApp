package persistance;

import org.springframework.stereotype.Repository;

import model.Post;

@Repository
public class HibernatePublicacionDAO extends GenericDAO<Post> {
	
	public HibernatePublicacionDAO() {
		super(Post.class);
	}
}
