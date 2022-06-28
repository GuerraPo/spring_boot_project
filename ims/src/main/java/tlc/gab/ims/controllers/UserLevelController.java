package tlc.gab.ims.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import tlc.gab.ims.entities.WebUserLevel;
import tlc.gab.ims.services.UserLevelService;

@Controller
public class UserLevelController {
//	@Autowired
//    private UserLevelService userLevelService;
//	
//	@PostMapping("new-user-level")
//    public ResponseEntity<?> newUserLevel(@ModelAttribute WebUserLevel webUserLevel) {
//		return userLevelService.addUserLevel(webUserLevel);
//        try{
//            gabApplicantService.addApplicant(application, authentication.getName());
//        }catch (Exception e){
//            return new ResponseEntity<>("Can't save application!", HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity("Success!", HttpStatus.OK);
//    }
//	
//	 @RequestMapping("/user-level")
//	    public ResponseEntity<?> getLaboratoryList(){
//	        return userLevelService.getUserLevels();
//	    }
}
