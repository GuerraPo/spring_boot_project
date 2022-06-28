package tlc.gab.ims.controllers;

import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import tlc.gab.ims.entities.PapApplicantInfo;
import tlc.gab.ims.entities.PapEmailFeedback;
import tlc.gab.ims.entities.PapRole;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.payloads.AddApplicant;
import tlc.gab.ims.services.EmailServices;
import tlc.gab.ims.services.GabApplicantService;
import tlc.gab.ims.services.PapApplicantInfoService;
import tlc.gab.ims.services.PapEmailFeedbackService;
import tlc.gab.ims.utils.EmailHelper;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping("/walk-in")
public class WalkInController {

    Logger log = LoggerFactory.getLogger(WalkInController.class);

    @Autowired
    private GabApplicantService applicantService;

    @Autowired
    private PapApplicantInfoService applicantInfoService;

    @Autowired
    private PapEmailFeedbackService emailFeedbackService;

    @Autowired
    private EmailServices emailServices;

    @Autowired
    private GabApplicantService gabApplicantService;

    private EmailHelper emailHelper = new EmailHelper();

    @PostMapping("/add-web-user")
    public ResponseEntity<?> addWalkInApplication(@Valid @ModelAttribute("applicantInfo") PapApplicantInfo applicantInfo,
                                                  @RequestParam("image") MultipartFile multipartFile,
                                                  HttpServletRequest request) {
//    @PostMapping("/add-web-user")
//    public ResponseEntity<?> addWalkInApplication(@Valid @RequestBody PapApplicantInfo applicantInfo,
//                                                  @RequestParam("image") MultipartFile multipartFile,
//                                                  HttpServletRequest request) {
        String username = "";

        try {
            PapUser user = applicantInfo.getUserAccount();
            String autoPassword = RandomString.make(8);
            user.setPassword(autoPassword);
            String email = user.getEmail();
            username = email;
            user.setUsername(email);
            applicantInfo.setUserAccount(user);

            //Saving Applicant
            applicantInfoService.registerApplicant(applicantInfo, multipartFile);

            //Sending email to applicant
            PapEmailFeedback emailFeedback= emailFeedbackService.getEmailContent(1);

            JavaMailSenderImpl mailSender = emailServices.getMailSender();

            String text = emailFeedback.getContent();

            text = text.replace("[[name]]", user.getUsername());
            String verifyURL = getSiteURL(request) + "/verify?code=" + user.getVerificationCode();
            text = text.replace("[[URL]]", verifyURL);
            text = text.replace("[[USERNAME]]", email);
            text = text.replace("[[PASSWORD]]", autoPassword);

            emailHelper.sendEmail(mailSender,user.getEmail(),emailFeedback.getSubject(),text);
        } catch (Exception e) {
            log.error("Error",e);
            return new ResponseEntity<>("Bad request!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Success!", HttpStatus.OK);
    }
//
//    @PostMapping("/add-walk-in-application")
//    public ResponseEntity<?> addApplication(@ModelAttribute("application") AddApplicant application) {
//        return gabApplicantService.addApplicantWalkIn(application);
//    }

    @PostMapping("/add-walk-in-application")
    public ResponseEntity<?> addApplication(@RequestBody AddApplicant application) {
        return gabApplicantService.addApplicantWalkIn(application);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
