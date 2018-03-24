package persistance;

import org.springframework.stereotype.Repository;

import model.Publicacion;

@Repository
public class HibernatePublicacionDAO extends GenericDAO<Publicacion> {
	
	public HibernatePublicacionDAO() {
		super(Publicacion.class);
	}

}
