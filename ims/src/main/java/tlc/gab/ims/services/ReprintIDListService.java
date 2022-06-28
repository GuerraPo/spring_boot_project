package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.*;
import tlc.gab.ims.repositories.*;

@Service
public class ReprintIDListService {

    Logger log = LoggerFactory.getLogger(ReprintIDListService.class);

    @Autowired
    private ReprintIDListRepo reprintRepo;

    @Autowired
    private GabApplicantRepo applicantRepo;

    @Autowired
    private GabApplicantGameRecordRepo gameRecordRepo;

    @Autowired
    private GameRoleRepo roleRepo;

    @Autowired
    private GabApplicantRequirementsRepo reqRepo;

    @Autowired
    private GabApplicantAddressRepo addressRepo;

    public ResponseEntity<?> getIDDetails(String account_id) {
        ResponseEntity<?> response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            ReprintIDList idDetails = new ReprintIDList();

            GabApplicant applicantDetails = applicantRepo.findByAccountId(account_id);

            idDetails.setAccount_id(account_id);

            GabApplicantGameRecord gameRecord = gameRecordRepo.findByAccountId(account_id);
            GameRole role = roleRepo.findOneByCode(gameRecord.getRole());
            String applicantRole = role.getName();
            String address = addressRepo.getIDAddress(account_id,1);
            if(address.equalsIgnoreCase("") || address.equalsIgnoreCase(null)){
                address = addressRepo.getIDAddress(account_id,2);
            }

            response = new ResponseEntity<>(idDetails, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!", e);
        }
        return response;
    }

    public ResponseEntity<?> saveIDDetails(ReprintIDList idDetails) {
        ResponseEntity<?> response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            idDetails.setAccount_id(applicantRepo.generateId("gab_applicant"));
            ReprintIDList dtls = reprintRepo.save(idDetails);
            response = new ResponseEntity<>(dtls, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!", e);
        }
        return response;
    }
}
