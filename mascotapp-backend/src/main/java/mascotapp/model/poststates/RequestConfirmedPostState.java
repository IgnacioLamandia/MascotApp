package mascotapp.model.poststates;

import mascotapp.emailsender.EmailSenderService;
import mascotapp.model.Post;
import mascotapp.model.User;

public class RequestConfirmedPostState extends State{

	@Override
	public void handle(User owner, User otherUser, Post post) {
		
		
		String subject = "Solicitud confirmada"; // ver q poner en x
		String text = "El usuario " + owner.name + " su solicitud de " + post.title + ".";
		EmailSenderService.getInstance().sendEmail(subject, text, otherUser.email);
		
	}

}
