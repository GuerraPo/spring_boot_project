package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.MedicalLaboratories;
import tlc.gab.ims.repositories.MedicalRepo;

import java.util.List;

@Service
public class MedicalService {

    Logger log = LoggerFactory.getLogger(MedicalService.class);

    @Autowired
    private MedicalRepo medicalRepo;

    public ResponseEntity<?> getLaboratoryList() {
        ResponseEntity res = new ResponseEntity<>("Error in getting the laboratory list!", HttpStatus.BAD_REQUEST);
        try{
           List<MedicalLaboratories> labs = medicalRepo.findAll();
           res = new ResponseEntity(labs, HttpStatus.OK);
        }catch (Exception e){
            log.error("",e);
        }
        return res;
    }

    public ResponseEntity<?> addLaboratory(MedicalLaboratories lab) {
        ResponseEntity res = new ResponseEntity<>("Error in adding new laboratory!", HttpStatus.BAD_REQUEST);
        try{
            medicalRepo.save(lab);
            res = new ResponseEntity(lab, HttpStatus.OK);
        }catch(Exception e){
            log.error("",e);
        }
        return res;
    }

    public ResponseEntity<?> getLaboratoryDetails(int id) {
        ResponseEntity res = new ResponseEntity<>("Can't get laboratory details!", HttpStatus.BAD_REQUEST);
        try{
            MedicalLaboratories lab = medicalRepo.findLabById(id);
            res = new ResponseEntity(lab, HttpStatus.OK);
        }catch(Exception e){
            log.error("",e);
        }
        return res;
    }

    public ResponseEntity<?> deleteLaboratory(int id) {
        ResponseEntity res = new ResponseEntity<>("Can't delete laboratory", HttpStatus.BAD_REQUEST);
        try{
            medicalRepo.deleteById(id);
            res = new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            log.error("",e);
        }
        return res;
    }
}
