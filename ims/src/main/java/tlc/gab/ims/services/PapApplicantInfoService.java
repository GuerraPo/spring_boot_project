package tlc.gab.ims.services;

import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tlc.gab.ims.entities.*;
import tlc.gab.ims.repositories.PapApplicantInfoRepo;
import tlc.gab.ims.utils.FileUploadUtil;
import tlc.gab.ims.utils.GeneralUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PapApplicantInfoService {

    Logger log = LoggerFactory.getLogger(PapApplicantInfoService.class);

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PapApplicantInfoService applicantInfoService;

    @Autowired
    private PapRoleService roleService;

    GeneralUtil genUtil = new GeneralUtil();

    @Autowired
    private PapApplicantInfoRepo repo;

    @Value("${spring.avatar.upload}")
    private String avatarPath;

    public void registerApplicant(PapApplicantInfo applicantInfo, MultipartFile multipartFile){
        try{

            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            if (!fileName.isEmpty()) {
                String[] slicedFile = fileName.split("\\.");
                PapUser user = applicantInfo.getUserAccount();
                int lastArray = slicedFile.length-1;
                String ext = slicedFile[lastArray];
                fileName = user.getUsername()+"."+ext;
                user.setAvatar(fileName);
                applicantInfo.setUserAccount(user);
                FileUploadUtil.saveFile(avatarPath, fileName, multipartFile);
            } else {
                log.warn("No image detected!!!");
            }

            applicantInfo.setCreatedDateTime(genUtil.getCurrentDateTime());
            applicantInfo.setModifiedDateTime(genUtil.getCurrentDateTime());
            applicantInfo.setCreatedBy("APPLICANT");
            applicantInfo.setModifiedBy("APPLICANT");

            //Encrypting Password
            PapUser user = applicantInfo.getUserAccount();
            String encryptedPass = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPass);

            // Attempt to save "application_id" in PapUser table
            user.setApplicantInfo(applicantInfo);


            user.setDateCreated(genUtil.getCurrentDateTime());
            user.setStatus("ACTIVE");

            // Setting role to applicant
            List<PapRole> roles = roleService.listAllRoles();
            Set<PapRole> role= new HashSet<PapRole>();
            role.add(roles.get(0));
            user.setRoles(role);

            String randomCode = RandomString.make(64);
            user.setVerificationCode(randomCode);
            user.setEnabled(false);

            applicantInfo.setUserAccount(user);

            List<PapApplicantAddress> addresses = applicantInfo.getAddress();
            int ctr=0;
            for(PapApplicantAddress address : addresses){
                ctr++;
                address.setCreatedDateTime(genUtil.getCurrentDateTime());
                address.setModifiedDateTime(genUtil.getCurrentDateTime());
                address.setModifiedBy("APPLICANT");
                address.setCreatedBy("APPLICANT");
                address.setType(ctr);
            }
            applicantInfo.setAddress(addresses);

            List<PapApplicantContact> contacts = applicantInfo.getContacts();
            int contactType = 0;
            for(PapApplicantContact contact : contacts){
                contactType++;
                contact.setType(""+contactType);
                contact.setCreatedDateTime(genUtil.getCurrentDateTime());
                contact.setModifiedDateTime(genUtil.getCurrentDateTime());
                contact.setCreatedBy("APPLICANT");
                contact.setModifiedBy("APPLICANT");
            }
            applicantInfo.setContacts(contacts);

            if(applicantInfo.getStateOffense().isEmpty()){
                applicantInfo.setAccusedCrime("NO");
            }else{
                applicantInfo.setAccusedCrime("YES");
            }

            repo.save(applicantInfo);
        }
        catch(Exception e){
            log.error("Can't register new applicant", e);
        }
    }

    public void registerApplicant(int id){
        repo.deleteById(id);
    }

}
