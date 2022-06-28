package tlc.gab.ims.controllers;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import tlc.gab.ims.entities.*;
import tlc.gab.ims.services.*;
import tlc.gab.ims.payloads.AddApplicant;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.List;

@Controller
public class PageController {

    Logger log = LoggerFactory.getLogger(PageController.class);

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private GabApplicantAddressTypeService addressTypeService;

    @Autowired
    private PapUserService userService;

    @Autowired
    private GabApplicantService gabApplicantService;
    
    @Autowired
    private UserLevelService userLevelService;

    @Autowired
    private PapRoleService roleService;

    //=======================================================================================================

    @RequestMapping("/home")
    public String redirect(){
        return "redirect:/";
    }

    @RequestMapping("/")
    public ModelAndView dashboard(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/main");
        String loginStat = loginStatus(authentication);
        mav.addObject("loginStat",loginStat);

        return mav;
    }

    @RequestMapping("/register")
    public ModelAndView register(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/register");
        String loginStat = loginStatus(authentication);
        PapApplicantInfo applicantInfo = new PapApplicantInfo();
        List<GabApplicantAddressType> addressTypes = addressTypeService.getAddressTypes();

        mav.addObject("loginStat",loginStat);
        mav.addObject("applicantInfo",applicantInfo);
        mav.addObject("addressTypes",addressTypes);

        return mav;
    }

    @RequestMapping("/applications")
    public ModelAndView license(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/applications");
        String loginStat = loginStatus(authentication);
        AddApplicant editApplication = new AddApplicant();

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        
        mav.addObject("loginStat",loginStat);
        mav.addObject("editApplication",editApplication);
        return mav;
    }

    @RequestMapping("/permits")
    public ModelAndView permits(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/permits");
        String loginStat = loginStatus(authentication);
        mav.addObject("loginStat",loginStat);
        return mav;
    }

    @RequestMapping("/applications/new-license")
    public ModelAndView newLicense(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/new-license");
        String loginStat = loginStatus(authentication);
        AddApplicant application = new AddApplicant();

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();

        PapUser user = userService.checkUsername(authentication.getName());
        String avatar = user.getPhotosImagePath();

        mav.addObject("role", role);
        mav.addObject("application", application);
        mav.addObject("loginStat",loginStat);
        mav.addObject("avatar", avatar);
        return mav;
    }

    @RequestMapping("/applications/new-permit")
    public ModelAndView newPermit(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/new-permit");

        String loginStat = loginStatus(authentication);
        AddApplicant application = new AddApplicant();

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        
        
        mav.addObject("application", application);
        mav.addObject("loginStat",loginStat);
        return mav;
    }

    @RequestMapping("/user-profile")
    public ModelAndView userProfile(Authentication authentication){
        ModelAndView mav=new ModelAndView("pages/profile");
        String loginStat = loginStatus(authentication);
        String avatar = userService.getAvatar(authentication.getName());
        PapUser user = userService.checkUsername(authentication.getName());
        user.setPassword("");

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        
        mav.addObject("loginStat",loginStat);
        mav.addObject("avatar", avatar);
        mav.addObject("profile", user);
        return mav;
    }

    @RequestMapping("applications/edit-application")
    public ModelAndView editApplication(Authentication authentication, @RequestParam String accountId) {
        ModelAndView mav=new ModelAndView("pages/profile");

        String loginStat = loginStatus(authentication);
        AddApplicant appDetails = gabApplicantService.getApplication(accountId, authentication.getName());

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        
        mav.addObject("loginStat",loginStat);
        mav.addObject("appDetails",appDetails);

        return mav;
    }

    @RequestMapping("/medical-facilities")
    public ModelAndView medicalFacilities(Authentication authentication){
        ModelAndView mav = new ModelAndView("pages/medical-facilities");

        String loginStat = loginStatus(authentication);
        MedicalLaboratories medical = new MedicalLaboratories();

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        
        mav.addObject("loginStat", loginStat);
        mav.addObject("medical", medical);

        return mav;
    }

    @RequestMapping("/access-denied")
    public ModelAndView accessDenied(){
        ModelAndView mav = new ModelAndView("pages/access-denied");

        return mav;
    }

    @RequestMapping("/new-medical-facilities")
    public ModelAndView newMedicalFacilities(Authentication authentication){
        ModelAndView mav = new ModelAndView("pages/new-medical-facilities");

        String loginStat = loginStatus(authentication);
        MedicalLaboratories medical = new MedicalLaboratories();

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        
        mav.addObject("loginStat", loginStat);
        mav.addObject("medical", medical);

        return mav;
    }

    @RequestMapping("/web-user")
    public ModelAndView userLevel(Authentication authentication){
        ModelAndView mav = new ModelAndView("pages/web-user");

        String loginStat = loginStatus(authentication);
        WebUserLevel userLevel = new WebUserLevel();

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        PapUser user = new PapUser();
        mav.addObject("role", role);

        mav.addObject("user", user);
        mav.addObject("loginStat", loginStat);
        mav.addObject("medical", userLevel);

        return mav;
    }
    
    @RequestMapping("/new-web-user")
    public ModelAndView newUserLevel(Authentication authentication){
        ModelAndView mav = new ModelAndView("pages/new-web-user");

        String loginStat = loginStatus(authentication);

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);

        PapUser user = new PapUser();
        List<PapRole> userRoles = roleService.getUserRoles();

        mav.addObject("userRoles", userRoles);
        mav.addObject("user", user);
        mav.addObject("loginStat", loginStat);

        return mav;
    }

    @RequestMapping("/walk-in-form")
    public ModelAndView walkIn(Authentication authentication){
        ModelAndView mav = new ModelAndView("pages/walk-in");

        String loginStat = loginStatus(authentication);

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);

        PapUser user = new PapUser();
        List<PapRole> userRoles = roleService.getUserRoles();

        mav.addObject("userRoles", userRoles);
        mav.addObject("user", user);
        PapApplicantInfo applicantInfo = new PapApplicantInfo();
        mav.addObject("applicantInfo",applicantInfo);
        mav.addObject("loginStat", loginStat);

        return mav;
    }

    @RequestMapping("/get-avatar")
    @ResponseBody
    public String getAvatar(Authentication authentication){
        PapUser user = userService.checkUsername(authentication.getName());
        String avatar = user.getPhotosImagePath();
        return avatar;
    }

    @RequestMapping("/reprint-id-form/{account_id}")
    public ModelAndView reprintIdForm(Authentication authentication, @PathVariable(name = "account_id") String account_id) {
        ModelAndView mav=new ModelAndView("pages/reprintID");

        String loginStat = loginStatus(authentication);

        Collection<? extends GrantedAuthority> role = authentication.getAuthorities();
        mav.addObject("role", role);
        mav.addObject("loginStat",loginStat);
        mav.addObject("account_id",account_id);

        return mav;
    }

    @GetMapping(value = "classpath")
    public ResponseEntity<byte[]> fromClasspathAsResEntity(Authentication authentication) throws IOException {

        PapUser user = userService.checkUsername(authentication.getName());
        String avatar = "static/"+user.getPhotosImagePath();

        ClassPathResource imageFile = new ClassPathResource(avatar);

        byte[] imageBytes = StreamUtils.copyToByteArray(imageFile.getInputStream());

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
    }

    //==========================================================================================================

    public String loginStatus(Authentication authentication){
        // 0 - no user is logged in
        // 1 -  a user is logged in
        String stat = "0";
        try{
            authentication.getName();
            stat = "1";
        }
        catch(Exception e){
            stat="0";
        }
        return stat;
    }
}
