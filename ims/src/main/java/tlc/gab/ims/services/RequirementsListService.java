package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.RequirementsList;
import tlc.gab.ims.repositories.RequirementsListRepo;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequirementsListService {

    Logger log = LoggerFactory.getLogger(RequirementsListService.class);

    @Autowired
    private RequirementsListRepo repo;

    public List<RequirementsList> findDocumentaryRequirements(String role) {
        List<RequirementsList> requirements= new ArrayList<>();
        try{
            requirements = repo.findDocumentaryRequirements(role);
        }catch (Exception e){
            log.error("Failed!",e);
        }
        return requirements;
    }

    public List<RequirementsList> findMedicalRequirements(String role) {
        List<RequirementsList> requirements= new ArrayList<>();
        try{
            requirements = repo.findMedicalRequirements(role);
        }catch (Exception e){
            log.error("Failed!",e);
        }
        return requirements;
    }
}
