package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tlc.gab.ims.entities.*;
import tlc.gab.ims.payloads.AddRequirements;
import tlc.gab.ims.payloads.CopyPreviousRequirement;
import tlc.gab.ims.repositories.*;
import tlc.gab.ims.utils.FileUploadUtil;
import tlc.gab.ims.utils.GeneralUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class GabApplicantRequirementsService {

    Logger log = LoggerFactory.getLogger(GabApplicantRequirementsService.class);

    @Autowired
    private GabApplicantRequirementsRepo repo;

    @Autowired
    private RequirementsListRepo reqListRepo;

    @Autowired
    private GabApplicantGameRecordRepo gameRecordRepo;

    @Autowired
    private WorkflowRepo workflowRepo;

    @Autowired
    private WorkflowLinesRepo workflowLinesRepo;

    @Autowired
    private GabApplicantRepo applicantRepo;

    @Autowired
    private GabApplicantStatusRecordsRepo statusRecordsRepo;

    @Autowired
    private GabGamesRepo gamesRepo;

    private GeneralUtil genutil = new GeneralUtil();

    @Value("${spring.requirements.upload}")
    private String requirementsPath;

    @Value("${spring.main.system.url}")
    private String mainUrl;

    public void uploadFile(AddRequirements file, String name, MultipartFile actualFile) throws IOException {
        try{
            String accountId = file.getACCOUNT_ID();
            String requirements = file.getREQUIREMENTS();
            GabApplicantRequirements req = new GabApplicantRequirements();

            if(file.getTYPE().equalsIgnoreCase("DISPLAY_PHOTO")){
                requirements = "R000";
            }

            Boolean notYetUploaded = repo.checkIfExisting(accountId, requirements)==null;

            if(!notYetUploaded){
                req = repo.checkIfExisting(accountId, requirements);
            }else{
                req.setCreatedDateTime(genutil.getCurrentDateTime());
            }

            MultipartFile multipartFile = actualFile;

            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            if (!fileName.isEmpty()) {
                String[] fileNameSliced = fileName.split("\\.");
                int lastArray = fileNameSliced.length - 1;
                String ext = fileNameSliced[lastArray];
                String newFileName = "";

                String type = file.getTYPE();
                String directory = "";

                String requirement = file.getREQUIREMENTS();

                if(type.equalsIgnoreCase("DISPLAY_PHOTO")){
                    requirement = "R000";
                    directory = file.getDIR()+file.getACCOUNT_ID()+"-R000";
                    newFileName = file.getACCOUNT_ID()+"-R000"+"."+ext;
                }else if(type.equalsIgnoreCase("ENDORSEMENT_LETTER")){
                    directory = file.getDIR()+file.getACCOUNT_ID()+"-ENDORSEMENT_LETTER";
                    newFileName = file.getACCOUNT_ID()+"-ENDORSEMENT_LETTER"+"."+ext;
                }else if(type.equalsIgnoreCase("GOOGLE_MAPS")){
                    directory = file.getDIR()+file.getACCOUNT_ID()+"-GOOGLE_MAPS";
                    newFileName = file.getACCOUNT_ID()+"-GOOGLE_MAPS"+"."+ext;
                }else if(type.equalsIgnoreCase("REQUEST_LETTER")){
                    directory = file.getDIR()+file.getACCOUNT_ID()+"-REQUEST_LETTER";
                    newFileName = file.getACCOUNT_ID()+"-REQUEST_LETTER"+"."+ext;
                }else if(type.equalsIgnoreCase("SIGNATORY")){
                    directory = file.getDIR()+file.getACCOUNT_ID()+"-SIG";
                    newFileName = file.getACCOUNT_ID()+"-SIG"+"."+ext;
                }else{
                    directory = file.getDIR()+file.getACCOUNT_ID()+"-"+file.getREQUIREMENTS();
                    newFileName = file.getACCOUNT_ID()+"-"+file.getREQUIREMENTS()+"."+ext;
                }

                FileUploadUtil.uploadReq(requirementsPath, newFileName, multipartFile);

                req.setAccountId(file.getACCOUNT_ID());
                req.setRequirements(requirement);
                req.setType(file.getTYPE());
                req.setDir(directory);
                req.setStatus(4);
                req.setFileExt(ext);
                req.setCreatedBy(name);
                req.setModifiedBy(name);
                req.setModifiedDateTime(genutil.getCurrentDateTime());

                repo.save(req);

                // For checking if all the documentary requirements where uploaded
                GabApplicantGameRecord gameRecord = gameRecordRepo.findByAccountId(file.getACCOUNT_ID());
                String role = gameRecord.getRole();
            }
        }catch(Exception e){
            log.error("Failed!", e);
        }
    }

    public ResponseEntity getRequirementsByApp(String accountid) {
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            List<GabApplicantRequirements> newReqs = new ArrayList<>();
            List<GabApplicantRequirements> reqs = repo.findByAccountId(accountid);
            for(GabApplicantRequirements req: reqs){
                String dir = req.getDir();
                req.setDir(dir.replace("../..", mainUrl));
                newReqs.add(req);
            }
            responseEntity = new ResponseEntity<>(newReqs, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!",e);
        }
        return responseEntity;
    }

    public ResponseEntity getSignatory(String accountid) {
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            GabApplicantRequirements reqs = repo.findUploadedSignatoryRequirements(accountid);
            Boolean empty = reqs == null;
            if(!empty){
                log.info("Not null: "+reqs);
                responseEntity = new ResponseEntity<>(reqs, HttpStatus.OK);
            }
        }catch(Exception e){
            log.error("Failed!",e);
        }
        return responseEntity;
    }

    public ResponseEntity getDisplayPhoto(String accountid) {
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            GabApplicantRequirements reqs = repo.findUploadedDisplayPhotoRequirements(accountid);
            Boolean empty = reqs == null;
            if(!empty){
                log.info("Not null: "+reqs);
                responseEntity = new ResponseEntity<>(reqs, HttpStatus.OK);
            }
        }catch(Exception e){
            log.error("Failed!",e);
        }
        return responseEntity;
    }

    public ResponseEntity copyPreviousSignature(CopyPreviousRequirement copyto, String username) {
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            String copyFrom = copyto.getId_for();
            String copyTo = copyto.getAccount_id();
            GabApplicantRequirements signatureDetails = repo.getByAccountId(copyFrom,"SIG","SIGNATORY");
            GabApplicantRequirements copiedSignatureDetails = new GabApplicantRequirements();

            copiedSignatureDetails.setAccountId(copyTo);
            copiedSignatureDetails.setRequirements(signatureDetails.getRequirements());
            copiedSignatureDetails.setType(signatureDetails.getType());
            copiedSignatureDetails.setDir(signatureDetails.getDir());
            copiedSignatureDetails.setStatus(4);
            copiedSignatureDetails.setFileExt(signatureDetails.getFileExt());
            copiedSignatureDetails.setCreatedBy(username);
            copiedSignatureDetails.setModifiedBy(username);
            String datetime = genutil.getCurrentDateTime();
            copiedSignatureDetails.setCreatedDateTime(datetime);
            copiedSignatureDetails.setModifiedDateTime(datetime);

            repo.save(copiedSignatureDetails);

            responseEntity = new ResponseEntity<>("Success!", HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!",e);
        }
        return responseEntity;
    }

    public ResponseEntity copyPreviousDisplayPhoto(CopyPreviousRequirement copyto, String username) {
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            String copyFrom = copyto.getId_for();
            String copyTo = copyto.getAccount_id();
            GabApplicantRequirements signatureDetails = repo.getByAccountId(copyFrom,"R000","DISPLAY_PHOTO");
            GabApplicantRequirements copiedSignatureDetails = new GabApplicantRequirements();

            copiedSignatureDetails.setAccountId(copyTo);
            copiedSignatureDetails.setRequirements(signatureDetails.getRequirements());
            copiedSignatureDetails.setType(signatureDetails.getType());
            copiedSignatureDetails.setDir(signatureDetails.getDir());
            copiedSignatureDetails.setStatus(4);
            copiedSignatureDetails.setFileExt(signatureDetails.getFileExt());
            copiedSignatureDetails.setCreatedBy(username);
            copiedSignatureDetails.setModifiedBy(username);
            String datetime = genutil.getCurrentDateTime();
            copiedSignatureDetails.setCreatedDateTime(datetime);
            copiedSignatureDetails.setModifiedDateTime(datetime);

            repo.save(copiedSignatureDetails);

            responseEntity = new ResponseEntity<>("Success!", HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!",e);
        }
        return responseEntity;
    }
}
