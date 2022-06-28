package tlc.gab.ims.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.services.PapUserService;
import tlc.gab.ims.utils.FileUploadUtil;
import tlc.gab.ims.utils.GeneralUtil;

import java.io.IOException;

@Controller
public class ProfileController {

    Logger log = LoggerFactory.getLogger(ProfileController.class);

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PapUserService userService;

    @Value("${spring.avatar.upload}")
    private String avatarPath;

    private GeneralUtil generalUtil = new GeneralUtil();

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@ModelAttribute("profile") PapUser profile, @RequestParam("image") MultipartFile multipartFile, Authentication authentication) throws IOException {

        try{

            PapUser currentProfile = userService.checkUsername(authentication.getName());
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            if(!fileName.isEmpty()){
                String[] slicedFile = fileName.split("\\.");
                int lastArray = slicedFile.length-1;
                String ext = slicedFile[lastArray];
                fileName = currentProfile.getUsername()+"."+ext;
                currentProfile.setAvatar(fileName);
                FileUploadUtil.saveFile(avatarPath, fileName, multipartFile);
            }

            if(!profile.getPassword().isEmpty()){
                currentProfile.setPassword(bCryptPasswordEncoder.encode(profile.getPassword()));
            }
            userService.saveWebUserApplicant(currentProfile);
        }catch(Exception e){
            log.error("Can't update user profile", e);
            return new ResponseEntity<>("Bad request!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("Your profile is now updated!", HttpStatus.OK);
    }
}
