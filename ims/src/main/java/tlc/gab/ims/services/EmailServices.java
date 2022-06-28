package tlc.gab.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import tlc.gab.ims.email.EmailConfig;
import tlc.gab.ims.entities.PapEmailFeedback;
import tlc.gab.ims.entities.PapUser;

import java.util.Properties;

@Service
public class EmailServices {

    @Autowired
    private EmailConfig emailConfig;

    @Autowired
    private PapEmailFeedbackService emailFeedbackService;

    public EmailServices(EmailConfig emailConfig){
        this.emailConfig = emailConfig;
    }

    public JavaMailSenderImpl getMailSender(){

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailConfig.getHost());
        mailSender.setPort(emailConfig.getPort());
        mailSender.setUsername(emailConfig.getUsername());
        mailSender.setPassword(emailConfig.getPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
