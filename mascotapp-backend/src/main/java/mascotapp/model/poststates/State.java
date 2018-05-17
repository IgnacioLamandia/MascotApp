package mascotapp.model.poststates;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import mascotapp.model.Post;
import mascotapp.model.User;

@Entity
public abstract class State {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Long id;
	
	public State() {};
	
	/*
	 	1- NewPostState (avanza a 2)
	 	2- RequestPostState (avanza a 3.1 o 3.2)
	 	3.1- RequestConfirmedPostState (avanza a 4) 
	 	3.2- RequestDeclinePostState (vuelve a 1)
	 	4- CollectPostState (avanza a 5.1 o 5.2)
	 	5.1- CollectDone (FINALIZA)
	 	5.2- CollectNotDone (vuelve a 1)
	 */
	
 	public abstract void handle(User owner, User otherUser, Post post);

}