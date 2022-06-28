package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.repositories.PapUserRepo;

import java.util.List;

@Service
public class PapUserService {

    Logger log = LoggerFactory.getLogger(PapUserService.class);

    @Autowired
    private PapUserRepo repo;

    public void saveWebUserApplicant(PapUser user) {
        repo.save(user);
    }

    public PapUser getUserProfile(int id){
        PapUser profile = null;
        try{
            profile = repo.findById(id).get();
        }
        catch (Exception e){
            log.error("No user profile found!",e);
            return profile;
        }
        return profile;
    }

    public PapUser checkEmail(String email) {
        return repo.findByEmail(email);
    }

    public PapUser checkUsername(String username) {
        return repo.findByUsername(username);
    }

    public String getAvatar(String username){
        PapUser usr = checkUsername(username);
        String avatar = usr.getPhotosImagePath();
        return avatar;
    }

    public List<PapUser> getUsersForAdmin() {
        return repo.getUsersForAdmin();
    }

    public PapUser findById(int id) {
        PapUser profile = null;
        try{
            profile = repo.findById(id).get();
        }catch(Exception e){
            log.error("Failed!",e);
        }

        return profile;
    }

    public boolean verify(String verificationCode) {
        PapUser user = repo.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            repo.save(user);

            return true;
        }

    }
}
