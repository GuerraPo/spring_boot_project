package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.repositories.PapUserRepo;
import tlc.gab.ims.utils.FileUploadUtil;
import tlc.gab.ims.utils.GeneralUtil;

@Service
public class WebUserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PapUserRepo userRepo;

    GeneralUtil genUtil = new GeneralUtil();

    Logger log = LoggerFactory.getLogger(WebUserService.class);

    public void saveWebUser(PapUser user, MultipartFile multipartFile) {
        try{
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            if (!fileName.isEmpty()) {
                fileName = fileName.toLowerCase().replaceAll(" ", "-");
                fileName = user.getUsername()+fileName;
                user.setAvatar(fileName);
                String uploadDir = "./user-avatars/";
                FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            } else {
                log.warn("No image detected!!!");
            }

            String password = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(password);
            user.setDateCreated(genUtil.getCurrentDateTime());
            user.setStatus("ACTIVE");
            user.setEnabled(true);
            userRepo.save(user);

        }catch(Exception e){
            log.error("Failed!", e);
        }
    }
}
