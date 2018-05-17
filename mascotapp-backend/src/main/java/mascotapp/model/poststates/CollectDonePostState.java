package mascotapp.model.poststates;

import javax.persistence.Entity;

import mascotapp.model.Post;
import mascotapp.model.User;

@Entity
public class CollectDonePostState extends State {

	@Override
	public void handle(User owner, User otherUser, Post post) {
		//VER SI ELIMINAR EL POST O QUE HACER (IMPRIMIR HISTORIAL?)
	}

}
