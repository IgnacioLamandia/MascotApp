package mascotapp.persistance;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class GenericDAO<T> {

	private Class<T> entityType;
	protected static final SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
	
	@Autowired
	public GenericDAO() {
	}
	
	public GenericDAO(Class<T> entityType) {
		this.entityType = entityType;
	}

	public long save(T object) {
		Session session = sessionFactory.openSession();
		Long lastId = null;
		try {
			session.beginTransaction();
			lastId =(Long)session.save(object);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
		return lastId;
	}

	public void update(T object) {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			session.update(object);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
	}
	
	public void delete(T object) {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			session.delete(object);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
	}

	@SuppressWarnings("deprecation")
	public T getById(Long id) {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			String hql = "from " + entityType.getSimpleName() + 
						" x " + "where x.id = :unId";
			Query<T> query = session.createQuery(hql, entityType);
			query.setParameter("unId", id);
			return query.getSingleResult();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
	}

	@SuppressWarnings("deprecation")
	public List<T> getAll() {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			String hql = "from " + entityType.getSimpleName();
			Query<T> query = session.createQuery(hql, entityType);
			session.getTransaction().commit();
			return (List<T>) query.getResultList();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}		
	}
}
