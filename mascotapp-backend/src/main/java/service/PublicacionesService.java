package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import persistance.HibernatePublicacionDAO;
import model.Post;

@Service("publicacionesService")
public class PublicacionesService {
	
	@Autowired
	private HibernatePublicacionDAO publiDAO;
	
	public PublicacionesService() {
		publiDAO = new HibernatePublicacionDAO();
	}
	
	@Transactional
	public void save(Post post) {	
		publiDAO.save(post);			
	}

	@Transactional
	public void update(Post post) {	
		publiDAO.update(post);		
	}

	@Transactional
	public void delete(Long id) {	
		publiDAO.delete(getById(id));				
	}

	@Transactional
	public Post getById(Long id) {
		return publiDAO.getById(id);
	}

	@Transactional
	public List<Post> getAll() {	
		return publiDAO.getAll();
	}

}
