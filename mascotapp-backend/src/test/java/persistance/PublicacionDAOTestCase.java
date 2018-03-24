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
/*
	@Test
	public void testGuardarYRecuperarEntrenador() 
	{
		Runner.runInSession(() -> {
		this.dao.guardar(this.entrenador1);
		this.dao.guardar(this.entrenador2);
		this.dao.guardar(this.entrenador3);
		
		Entrenador e1 = this.dao.recuperar("Ash");
		Entrenador e2 = this.dao.recuperar("Gary");
		Entrenador e3 = this.dao.recuperar("Red");
		
		assertEquals(this.entrenador1.getNombre(), (e1.getNombre()));
		assertEquals(this.entrenador2.getNombre(), (e2.getNombre()));
		assertEquals(this.entrenador3.getNombre(), (e3.getNombre()));
		
		return null;
	});
	}
*/
	@Test
	public void testGetAllEntrenador() 
	{
		Runner.runInSession(() -> {
			
			Collection<Publicacion> publicaciones = this.dao.getAll();
			
			Assert.assertEquals(4, publicaciones.size());
			
			return null;
		});
	}
/*	
	@Test
	public void testGetAllEnUbicacion() 
	{
		
		Runner.runInSession(() -> {
			
			this.entrenador1.setUbicacion(ubicacion1);
			this.entrenador2.setUbicacion(ubicacion1);
			
			this.dao.guardar(this.entrenador1);
			this.dao.guardar(this.entrenador2);
			this.dao.guardar(this.entrenador3);
			
			List<Entrenador> entrenadores = this.dao.getAllEnUbicacion("dojo");
			
			Assert.assertEquals(2, entrenadores.size());
			
			Assert.assertTrue(entrenadores.contains(entrenador1));
			Assert.assertTrue(entrenadores.contains(entrenador2));
			
			
			return null;
		});
	}*/
}