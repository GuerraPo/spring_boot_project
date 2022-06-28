package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.PapModule;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.repositories.PapModuleRepo;
import tlc.gab.ims.repositories.PapUserRepo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class PapModuleService {

    @Autowired
    private PapUserRepo userRepo;

    @Autowired
    private PapModuleRepo moduleRepo;

    Logger log = LoggerFactory.getLogger(PapModuleService.class);

    public List<PapModule> getuserModules(Collection<? extends GrantedAuthority> name) {
        List<PapModule> modules = new ArrayList<>();
        try{
            String role = "";
            for(GrantedAuthority e : name ){
                role = e.toString();
            }
            modules = moduleRepo.finByRole(role);
        }catch(Exception e){
            log.error("Failed!", e);
        }

        return modules;
    }
}
