package tlc.gab.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.GabApplicantAddressType;
import tlc.gab.ims.repositories.GabApplicantAddressTypeRepo;

import java.util.List;

@Service
public class GabApplicantAddressTypeService {

    @Autowired
    private GabApplicantAddressTypeRepo repo;

    public List<GabApplicantAddressType> getAddressTypes(){
        return repo.findAll();
    }
}
