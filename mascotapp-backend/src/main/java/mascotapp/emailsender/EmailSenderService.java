package mascotapp.emailsender;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public final class EmailSenderService {

	private final Properties properties = new Properties();
	private Session session;
	private static EmailSenderService emailSender = new EmailSenderService();
	 
    private EmailSenderService() {}
 
    public static EmailSenderService getInstance() {
        return emailSender;
    }
	 
	private void init() {

		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.port", 587);
		properties.put("mail.smtp.user", "mascotappmascotapp@gmail.com");
		properties.put("mail.smtp.auth", "true");

		session = Session.getDefaultInstance(properties);
	}

	public void sendEmail(String subject, String text, String receiver) {

		init();
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress("mascotappmascotapp@gmail.com"));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver));
			message.setSubject(subject);
			message.setText(text);
			Transport transport = session.getTransport("smtp");
			transport.connect("mascotappmascotapp@gmail.com", "makoaforever");
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (MessagingException me) {
			me.printStackTrace();
		}
	}
}