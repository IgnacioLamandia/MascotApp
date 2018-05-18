package mascotapp.model.poststates;

import javax.persistence.Entity;

import mascotapp.emailsender.EmailSenderService;
import mascotapp.model.Post;
import mascotapp.model.User;

@Entity
public class RequestDeclinePostState extends State {

	@Override
	public void handle(User owner, User otherUser, Post post) {
		
		//post.setState(new NewPostState());
		
		String subject = "Solicitud de xxxxxxxx"; // ver q poner en x
		String text = "El usuario " + owner.name + " cancelo su solicitud de " + post.title + ".";
		EmailSenderService.getInstance().sendEmail(subject, text, otherUser.email);
	}

}
