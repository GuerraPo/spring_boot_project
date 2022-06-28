package tlc.gab.ims.services;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tlc.gab.ims.controllers.ApplicantRegistrationController;
import tlc.gab.ims.email.EmailConfig;
import tlc.gab.ims.entities.PapEmailFeedback;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.repositories.PapUserRepo;
import tlc.gab.ims.utils.EmailHelper;
import tlc.gab.ims.utils.GeneralUtil;

import javax.servlet.http.HttpServletRequest;

@Service
public class ForgetPasswordService {

    Logger log = LoggerFactory.getLogger(ForgetPasswordService.class);

    @Autowired
    private PapEmailFeedbackService emailFeedbackService;

    @Autowired
    private EmailConfig emailConfig;

    @Autowired
    private PapUserRepo userRepo;

    @Autowired
    private EmailServices emailServices;

    private GeneralUtil generalUtil;

    private EmailHelper emailHelper = new EmailHelper();
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void sendNewPassword(String email, HttpServletRequest request) {
        try{
            PapEmailFeedback emailFeedback= emailFeedbackService.getEmailContent(2);

            JavaMailSenderImpl mailSender = emailServices.getMailSender();

            String text = emailFeedback.getContent();
            String newPass = RandomStringUtils.randomAlphabetic(15);
            text = text.replace("[[password]]", newPass);
            text = text.replace("[[URL]]", getSiteURL(request)+"/login");

            emailHelper.sendEmail(mailSender,email,emailFeedback.getSubject(),text);

            String encodedPassword = bCryptPasswordEncoder.encode(newPass);
            userRepo.updatePassword(email,encodedPassword);

        }catch(Exception e){
            log.error("Can't send reset password.",e);
        }
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
