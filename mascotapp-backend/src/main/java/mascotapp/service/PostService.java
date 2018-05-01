package mascotapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mascotapp.model.Category;
import mascotapp.model.Post;
import mascotapp.persistance.HibernatePostDAO;

@Service("postService")
public class PostService {
	
	@Autowired
	private HibernatePostDAO postDAO;
	
	public PostService() {
		postDAO = new HibernatePostDAO();
	}
	
	@Transactional
	public void save(Post post) {	
		postDAO.save(post);			
	}

	@Transactional
	public void update(Post post) {	
		postDAO.update(post);		
	}

	@Transactional
	public void delete(Long id) {	
		postDAO.delete(getById(id));				
	}

	@Transactional
	public Post getById(Long id) {
		return postDAO.getById(id);
	}

	@Transactional
	public List<Post> getAll() {	
		return postDAO.getAll();
	}
	
	@Transactional
	public List<Post> getAllByCategory(Category category) {	
		return postDAO.getAllByCategory(category);
	}
	
	@Transactional
	public void deleteAll() {	
		postDAO.deleteAll();			
	}

}
