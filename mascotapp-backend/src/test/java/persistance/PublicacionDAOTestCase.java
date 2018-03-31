package persistance;

import java.io.IOException;
import java.util.Collection;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import model.Publicacion;
import service.HibernateDataService;

public class PublicacionDAOTestCase {

	private HibernatePublicacionDAO  dao = new HibernatePublicacionDAO();
	private HibernateDataService service = new HibernateDataService();
	
	@Before
	public void setUp() {
		try {
			service.createDatosIniciales();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testGetAllEntrenador() {
		Collection<Publicacion> publicaciones = this.dao.getAll();		
		Assert.assertEquals(4, publicaciones.size());
	}
}