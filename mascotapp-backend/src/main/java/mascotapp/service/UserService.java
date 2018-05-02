package mascotapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mascotapp.model.User;
import mascotapp.persistance.HibernateUserDao;

@Service("userService")
public class UserService {
	@Autowired
	private HibernateUserDao userDAO;
	
	public UserService() {
		userDAO = new HibernateUserDao();
	}
	
	@Transactional
	public void save(User user) {	
		userDAO.save(user);			
	}

	@Transactional
	public void update(User user) {	
		userDAO.update(user);		
	}

	@Transactional
	public void delete(Long id) {	
		userDAO.delete(getById(id));				
	}

	@Transactional
	public User getById(Long id) {
		return userDAO.getById(id);
	}

	@Transactional
	public List<User> getAll() {	
		return userDAO.getAll();
	}	
	
	@Transactional
	public void deleteAll() {	
		userDAO.deleteAll();			
	}
}
