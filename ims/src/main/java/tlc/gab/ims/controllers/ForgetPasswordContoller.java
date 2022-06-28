package tlc.gab.ims.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import tlc.gab.ims.repositories.PapUserRepo;
import tlc.gab.ims.services.ForgetPasswordService;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ForgetPasswordContoller {

    Logger log = LoggerFactory.getLogger(ForgetPasswordContoller.class);

    @Autowired
    private ForgetPasswordService forgetPasswordService;

    @Autowired
    private PapUserRepo userRepo;

    @PostMapping("forget-password")
    public ResponseEntity<?> forgetPasword(@ModelAttribute("email") String email,
                                           HttpServletRequest request) {
        ResponseEntity response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            if(userRepo.findByEmail(email) != null){
                forgetPasswordService.sendNewPassword(email,request);
                response = new ResponseEntity("Your new password was sent to your email. Please update your password after logging in", HttpStatus.OK);
            }
        }catch (Exception e){
            log.error("Failed!",e);
        }
        return response;
    }
}
