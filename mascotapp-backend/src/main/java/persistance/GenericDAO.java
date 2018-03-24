package persistance;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class GenericDAO<T> {

	private Class<T> entityType;

	@Autowired
	public GenericDAO() {
	}
	
	public GenericDAO(Class<T> entityType) {
		this.entityType = entityType;
	}

	public void save(T object) {
		Session session = Runner.getCurrentSession();
		session.save(object);
	}

	public void update(T object) {
		Session session = Runner.getCurrentSession();
		session.update(object);
	}
	
	public void delete(T object) {
		Session session = Runner.getCurrentSession();
		session.delete(object);
	}

	@SuppressWarnings("deprecation")
	public T getById(Long id) {
		Session session = Runner.getCurrentSession();
		String hql = "from " + entityType.getSimpleName() + 
				" x " + "where x.id = :unId";
		Query<T> query = session.createQuery(hql,  entityType);
		query.setParameter("unId", id);
		return query.getSingleResult();
	}

	@SuppressWarnings("deprecation")
	public List<T> getAll() {
		Session session = Runner.getCurrentSession();
		String hql = "from " + entityType.getSimpleName();
		Query<T> query = session.createQuery(hql, entityType);
		return (List<T>) query.getResultList();
		
	}
}
