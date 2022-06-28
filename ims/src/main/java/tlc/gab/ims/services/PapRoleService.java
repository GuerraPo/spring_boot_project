package tlc.gab.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.PapRole;
import tlc.gab.ims.repositories.PapRoleRepo;

import java.util.List;

@Service
public class PapRoleService {

    @Autowired
    private PapRoleRepo repo;

    public List<PapRole> listAllRoles(){

        return repo.findAll();
    }

    public List<PapRole> getUserRoles() {
        return repo.getUserRoles();
    }
}
