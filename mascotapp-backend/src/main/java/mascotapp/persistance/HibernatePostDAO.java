package mascotapp.persistance;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import mascotapp.model.Category;
import mascotapp.model.Post;

@Repository
public class HibernatePostDAO extends GenericDAO<Post> {	
	public HibernatePostDAO() {
		super(Post.class);
	}
	
	@SuppressWarnings("deprecation")
	public List<Post> getAllByCategory(Category category) {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			String hql = "from Post" + 
						" x " + "where x.category = :aCategory";
			Query<Post> query = session.createQuery(hql, entityType);
			query.setParameter("aCategory", category);
			session.getTransaction().commit();
			return (List<Post>) query.getResultList();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}		
	}
}
