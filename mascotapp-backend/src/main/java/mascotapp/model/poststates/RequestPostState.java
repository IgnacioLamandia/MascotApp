package mascotapp.model.poststates;

import javax.persistence.Entity;

import mascotapp.emailsender.EmailSenderService;
import mascotapp.model.Post;
import mascotapp.model.User;

@Entity
public class RequestPostState extends State {
	

	@Override
	public void handle(User owner, User otherUser, Post post) {

		String subject = "Solicitud de xxxxxxxx"; // ver q poner en x
		String text = "El usuario " + otherUser.name + " solicita " + post.title + 
				". Por favor confirme o rechaze la solicitud.";
		EmailSenderService.getInstance().sendEmail(subject, text, owner.email);
	}


}
