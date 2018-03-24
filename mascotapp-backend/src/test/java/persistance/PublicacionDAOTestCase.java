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
	public void setUp()
	{
		Runner.runInSession(() -> {
			try {
				service.createDatosIniciales();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		});
	}
	
	@After
	public void cleanup() {
		SessionFactoryProvider.destroy();
	}
	
	@Test
	public void testGetAllEntrenador() 
	{
		Runner.runInSession(() -> {
			
			Collection<Publicacion> publicaciones = this.dao.getAll();
			
			Assert.assertEquals(4, publicaciones.size());
			
			return null;
		});
	}
}