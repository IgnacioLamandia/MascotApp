package mascotapp.persistance;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import mascotapp.model.User;

@Repository
public class HibernateUserDao extends GenericDAO<User> {	
	public HibernateUserDao() {
		super(User.class);
	}
	
	@SuppressWarnings("deprecation")
	public void deleteAll() {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			String hql = "delete from User";
			Query<User> query = session.createQuery(hql);
			query.executeUpdate();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}		
	}
}