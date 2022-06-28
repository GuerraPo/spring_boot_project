package tlc.gab.ims.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import tlc.gab.ims.entities.PapModule;
import tlc.gab.ims.payloads.AddApplicant;
import tlc.gab.ims.services.PapModuleService;

import java.util.ArrayList;
import java.util.List;

@Controller
public class RoleModuleController {

    @Autowired
    private PapModuleService moduleService;

    @RequestMapping("get-user-modules")
    public ResponseEntity<?> addApplication(Authentication authentication) {
        List<PapModule> modules = new ArrayList<>();
        try{
            modules = moduleService.getuserModules(authentication.getAuthorities());
        }catch (Exception e){
            return new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(modules, HttpStatus.OK);
    }
}
