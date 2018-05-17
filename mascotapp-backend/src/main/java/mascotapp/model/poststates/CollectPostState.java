package mascotapp.model.poststates;

import javax.persistence.Entity;

import mascotapp.emailsender.EmailSenderService;
import mascotapp.model.Post;
import mascotapp.model.User;

@Entity
public class CollectPostState extends State {

	@Override
	public void handle(User owner, User otherUser, Post post) {
		
		String subject = "Retiro"; // ver q poner
		String text = "El usuario " + otherUser.name + " confirma que quiere retirar " + post.title + 
				". Por favor confirme o rechaze la solicitud de retiro.";
		EmailSenderService.getInstance().sendEmail(subject, text, owner.email);
	}

}
