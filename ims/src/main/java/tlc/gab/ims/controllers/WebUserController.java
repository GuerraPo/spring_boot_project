package tlc.gab.ims.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import tlc.gab.ims.entities.PapModule;
import tlc.gab.ims.entities.PapRole;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.services.PapRoleService;
import tlc.gab.ims.services.PapUserService;
import tlc.gab.ims.services.WebUserService;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/web-user")
public class WebUserController {

    @Autowired
    private WebUserService webUserService;

    @Autowired
    private PapRoleService roleService;

    @Autowired
    private PapUserService userService;

    @PostMapping("/add-web-user")
    public ResponseEntity<?> addApplication(@ModelAttribute("user") PapUser profile,
                                            @RequestParam("image") MultipartFile multipartFile) {
        try{
            webUserService.saveWebUser(profile, multipartFile);
        }catch (Exception e){
            return new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Success!", HttpStatus.OK);
    }

    @RequestMapping("/get-user-roles")
    public ResponseEntity<?> getuserRoles() {
        List<PapRole> userLevels = new ArrayList<>();
        try{
            userLevels = roleService.getUserRoles();
        }catch (Exception e){
            return new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(userLevels, HttpStatus.OK);
    }

    @RequestMapping("/get-users")
    public ResponseEntity<?> getUsers() {
        List<PapUser> users = new ArrayList<>();
        try{
            users = userService.getUsersForAdmin();
        }catch (Exception e){
            return new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(users, HttpStatus.OK);
    }

    @RequestMapping("/get-user")
    public ResponseEntity<?> getUser(@RequestParam("id") int id) {
        PapUser user = new PapUser();
        try{
            user = userService.findById(id);
        }catch (Exception e){
            return new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(user, HttpStatus.OK);
    }
}
