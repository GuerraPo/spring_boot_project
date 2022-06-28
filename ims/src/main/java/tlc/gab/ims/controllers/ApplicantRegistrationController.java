package tlc.gab.ims.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import tlc.gab.ims.email.EmailConfig;
import tlc.gab.ims.entities.PapApplicantInfo;
import tlc.gab.ims.entities.PapEmailFeedback;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.services.EmailServices;
import tlc.gab.ims.services.PapApplicantInfoService;
import tlc.gab.ims.services.PapEmailFeedbackService;
import tlc.gab.ims.services.PapUserService;
import tlc.gab.ims.utils.EmailHelper;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Properties;

@Controller
public class ApplicantRegistrationController {

    Logger log = LoggerFactory.getLogger(ApplicantRegistrationController.class);

    @Autowired
    private PapApplicantInfoService applicantInfoService;

    @Autowired
    private PapUserService userService;

    @Autowired
    private PapEmailFeedbackService emailFeedbackService;

    @Autowired
    private EmailConfig emailConfig;

    @Autowired
    private EmailServices emailServices;

    private EmailHelper emailHelper = new EmailHelper();

    @PostMapping("/register-applicant")
    public ResponseEntity<?> registerApplicant(@Valid @ModelAttribute("applicantInfo") PapApplicantInfo applicantInfo,
                                               @RequestParam("image") MultipartFile multipartFile,
                                               HttpServletRequest request) {

        try {
            //Saving Applicant
            applicantInfoService.registerApplicant(applicantInfo, multipartFile);

            //Sending email to applicant
            PapUser user = applicantInfo.getUserAccount();
            PapEmailFeedback emailFeedback= emailFeedbackService.getEmailContent(1);

            JavaMailSenderImpl mailSender = emailServices.getMailSender();

            String text = emailFeedback.getContent();

            text = text.replace("[[name]]", user.getUsername());
            String verifyURL = getSiteURL(request) + "/verify?code=" + user.getVerificationCode();
            text = text.replace("[[URL]]", verifyURL);
            text = text.replace("[[USERNAME]]", user.getUsername());
            text = text.replace("[[PASSWORD]]", user.getPassword());

            emailHelper.sendEmail(mailSender,user.getEmail(),emailFeedback.getSubject(),text);
        } catch (Exception e) {
            log.error("Error",e);
            return new ResponseEntity<>("Bad request!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("You are now registered! Please check your email to verify your account.", HttpStatus.OK);
    }

    @RequestMapping("/check-email")
    @ResponseBody
    public String checkEmail(@RequestParam String email){
        Boolean validEmail = userService.checkEmail(email) == null;
        return validEmail.toString();
    }

    @RequestMapping("/check-username")
    @ResponseBody
    public String checkUsername(@RequestParam String username){
        Boolean validUsername = userService.checkUsername(username) == null;
        return validUsername.toString();
    }

    @GetMapping("/verify")
    public ModelAndView verifyUser(@Param("code") String code) {
        ModelAndView mav = new ModelAndView("pages/verify_failed");
        if (userService.verify(code)) {
            mav = new ModelAndView("pages/verify_success");
        }
        return mav;
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
