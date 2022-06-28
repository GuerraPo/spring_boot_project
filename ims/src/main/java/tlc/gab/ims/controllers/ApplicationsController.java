package tlc.gab.ims.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tlc.gab.ims.entities.*;
import tlc.gab.ims.payloads.AddRequirements;
import tlc.gab.ims.payloads.CopyPreviousRequirement;
import tlc.gab.ims.repositories.*;
import tlc.gab.ims.services.*;
import tlc.gab.ims.payloads.AddApplicant;
import tlc.gab.ims.payloads.ApplicationList;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ApplicationsController {

    Logger log = LoggerFactory.getLogger(ApplicationsController.class);

    @Autowired
    private GabGamesRepo gamesRepo;

    @Autowired
    private GameRoleRepo rolesRepo;

    @Autowired
    private PapUserRepo userRepo;

    @Autowired
    private PapApplicantInfoRepo applicantRepo;

    @Autowired
    private PapApplicantAddressRepo applicantAddressRepo;

    @Autowired
    private PapApplicantContactRepo contactRepo;

    @Autowired
    private GabApplicantService gabApplicantService;

    @Autowired
    private GabApplicantGameRecordRepo gameRecordRepo;

    @Autowired
    private ApplicationTypeRepo appTypeRepo;

    @Autowired
    private ApplicationStatusRepo appStatusRepo;

    @Autowired
    private GabLicenseeGameRecordService licenseeGameRecordService;
    
    @Autowired
    private GabPermitteeGameRecordService permitteeGameRecordService;

    @Autowired
    private RequirementsListService requirementsListService;

    @Autowired
    private GabApplicantRequirementsService requirementsService;

    //=========================================================================================================

    @RequestMapping("applications/get-games")
    @ResponseBody
    public ResponseEntity<?> getGames(@RequestParam String classification){
        List<GabGames> games = new ArrayList<>();
        try{
            games = gamesRepo.findByClassification(classification);
        }catch(Exception e){
            log.error("Can't fetch games list", e);
            return new ResponseEntity<>("Can't fetch games list!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(games, HttpStatus.OK);
    }

    @RequestMapping("applications/get-game-roles")
    @ResponseBody
    public ResponseEntity<?> getGameRoles(@RequestParam String code){
        List<GameRole> roles = new ArrayList<>();
        try{
            roles = rolesRepo.findByCode(code);
        }catch(Exception e){
            log.error("Can't fetch games list", e);
            return new ResponseEntity<>("Can't fetch games list!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(roles, HttpStatus.OK);
    }

    @RequestMapping("applications/get-applicant-info")
    @ResponseBody
    public ResponseEntity<?> getApplicantInfo(Authentication authentication){
        PapApplicantInfo info = new PapApplicantInfo();
        try{
            String username = authentication.getName();
            PapUser user = userRepo.findByUsername(username);
            PapApplicantInfo inf = user.getApplicantInfo();

            info.setLastName(inf.getLastName());
            info.setFirstName(inf.getFirstName());
            info.setMiddleName(inf.getMiddleName());
            info.setNickName(inf.getNickName());
            info.setFirstName(inf.getFirstName());
            info.setAddress(inf.getAddress());
            info.setBirthDate(inf.getBirthDate());
            info.setBirthPlace(inf.getBirthPlace());
            info.setCitizenship(inf.getCitizenship());
            info.setCivilStatus(inf.getCivilStatus());
            info.setAccusedCrime(inf.getAccusedCrime());
            info.setContacts(inf.getContacts());
            info.setAge(inf.getAge());
            info.setHeight(inf.getHeight());
            info.setWeight(inf.getWeight());
            info.setAccusedCrime(inf.getAccusedCrime());
            info.setStateOffense(inf.getStateOffense());
            info.setHairColor(inf.getHairColor());
            info.setEyeColor(inf.getEyeColor());
            info.setSss(inf.getSss());
            info.setGender(inf.getGender());
            info.setEducationalBackground(inf.getEducationalBackground());
        }
        catch(Exception e){
            log.error("Can't find applicant details", e);
            return new ResponseEntity<>("Can't save applicant info!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(info, HttpStatus.OK);
    }

    @RequestMapping("/get-applications")
    @ResponseBody
    public ResponseEntity<?> getApplications(Authentication authentication, @RequestParam String month, @RequestParam String year, @RequestParam int applicationType){

        List<ApplicationList> appList = new ArrayList<>();
        try{
            List<GabApplicant> applications = new ArrayList<>();
            int type = applicationType;
            applications = gabApplicantService.getFilteredApplications(authentication.getName(), month, year, type);
            for(GabApplicant app : applications){
                ApplicationList apList = new ApplicationList();
                GabApplicantGameRecord gameRec = gameRecordRepo.findByAccountId(app.getAccountId());
                GabGames game = gamesRepo.findByCode(gameRec.getSports());
                GameRole role = rolesRepo.findOneByCode(gameRec.getRole());
                ApplicationType appType = appTypeRepo.getOne(app.getApptype());
                ApplicationStatus appStat = appStatusRepo.findByCode(app.getStatus());

                apList.setAccountId(app.getAccountId());

                if(game == null){
                    apList.setSports("-");
                }
                else{
                    apList.setSports(game.getName());
                }

                if(role == null){
                    apList.setRole("-");
                }else{
                    apList.setRole(role.getName());
                }

                String club = gameRec.getClub();

                if(club == null || club.isEmpty() || club.equalsIgnoreCase("")){
                    apList.setClub("-");
                }else{
                    apList.setClub(gameRec.getClub());
                }

                apList.setAppType(appType.getName());
                apList.setStatus(appStat.getName());
                apList.setTypeCode(appType.getTypeCode());

                appList.add(apList);
            }
        }catch (Exception e){
            log.error("cant return application list", e);
            return new ResponseEntity<>("Can't get license applications!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(appList, HttpStatus.OK);
    }

    @PostMapping("applications/add-application")
    public ResponseEntity<?> addApplication(@ModelAttribute("application") AddApplicant application, Authentication authentication) {
        return gabApplicantService.addApplicantV2(application, authentication.getName());
    }

    @GetMapping("applications/search-license-application")
    public ResponseEntity<?> searchLicenseApplication(@RequestParam String licenseNumber,
    													Authentication authentication){
        AddApplicant application = new AddApplicant();
        ResponseEntity responseEntity = new ResponseEntity<>("Can't find your application!", HttpStatus.BAD_REQUEST);
        try{
            application = licenseeGameRecordService.searchLicenseApplication(licenseNumber, authentication.getName());
            if(application.getvLICENSE_NUMBER()!=null){
                responseEntity = new ResponseEntity(application, HttpStatus.OK);
            }
        }catch(Exception e){

        }
        return responseEntity;
    }

    @GetMapping("get-update-applications")
    public ResponseEntity<?> getUpdateAppplication(@RequestParam("ACCOUNT_ID") String ACCOUNT_ID,
                                                   Authentication authentication){
        AddApplicant appDetails = new AddApplicant();
        try{
            appDetails = gabApplicantService.getApplication(ACCOUNT_ID, authentication.getName());
        }catch (Exception e){
            return new ResponseEntity<>("Can't save application!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(appDetails, HttpStatus.OK);
    }
    
    @GetMapping("applications/search-permit-application")
    public ResponseEntity<?> searchPermitApplication(@RequestParam String permitNumber,
    													Authentication authentication){
        AddApplicant application = new AddApplicant();
        ResponseEntity responseEntity = new ResponseEntity<>("Can't find your application!", HttpStatus.BAD_REQUEST);
        try{
            application = permitteeGameRecordService.searchPermitApplication(permitNumber, authentication.getName());
            if(application.getvLICENSE_NUMBER()!=null){
                responseEntity = new ResponseEntity(application, HttpStatus.OK);
            }
        }catch(Exception e){

        }
        return responseEntity;
    }

    @GetMapping("applications/get-documentary-requirements")
    public ResponseEntity<?> getDocumentaryRequirements(@RequestParam String role){
        List<RequirementsList> requirementsList = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            requirementsList = requirementsListService.findDocumentaryRequirements(role);
            responseEntity = new ResponseEntity(requirementsList, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed",e);
        }
        return responseEntity;
    }

    @GetMapping("applications/get-medical-requirements")
    public ResponseEntity<?> getMedicalRequirements(@RequestParam String role){
        List<RequirementsList> requirementsList = new ArrayList<>();
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            requirementsList = requirementsListService.findMedicalRequirements(role);
            responseEntity = new ResponseEntity(requirementsList, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed",e);
        }
        return responseEntity;
    }

    @PostMapping("applications/upload-requirements-directory")
    public ResponseEntity<?> uploadRequirementsDirectory(@ModelAttribute("file") AddRequirements requirements,
                                                         Authentication authentication,
                                                         @RequestParam("FILE") MultipartFile file){
        ResponseEntity responseEntity = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            requirementsService.uploadFile(requirements, authentication.getName(), file);
            responseEntity = new ResponseEntity("Success!", HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed",e);
        }
        return responseEntity;
    }

    @GetMapping("applications/get-requirements-per-app")
    public ResponseEntity<?> getRequirementsPerApp(Authentication authentication, @RequestParam("account_id") String accountid){
        ResponseEntity responseEntity = requirementsService.getRequirementsByApp(accountid);
        return responseEntity;
    }

    @GetMapping("applications/get-signatory")
    public ResponseEntity<?> getSignatory(Authentication authentication, @RequestParam("account_id") String accountid){
        ResponseEntity responseEntity = requirementsService.getSignatory(accountid);
        return responseEntity;
    }

    @GetMapping("applications/get-display-photo")
    public ResponseEntity<?> getDisplayPhoto(Authentication authentication, @RequestParam("account_id") String accountid){
        ResponseEntity responseEntity = requirementsService.getDisplayPhoto(accountid);
        return responseEntity;
    }

    @PostMapping("applications/copy-previous-signature")
    public ResponseEntity<?> copyPreviousSignature(@ModelAttribute("copy_to") CopyPreviousRequirement copyTo, Authentication authentication){
        ResponseEntity responseEntity = requirementsService.copyPreviousSignature(copyTo,authentication.getName());
        return responseEntity;
    }

    @PostMapping("applications/copy-previous-display-photo")
    public ResponseEntity<?> copyPreviousDisplayPhoto(@ModelAttribute("copy_to") CopyPreviousRequirement copyTo,Authentication authentication){
        ResponseEntity responseEntity = requirementsService.copyPreviousDisplayPhoto(copyTo,authentication.getName());
        return responseEntity;
    }

    @GetMapping("applications/get-permit-types")
    public ResponseEntity<?> getPermitTypes(Authentication authentication, @RequestParam("division") String division){
        ResponseEntity responseEntity = gabApplicantService.getPermitTypes(division);
        return responseEntity;
    }

    @GetMapping("applications/get-app-types")
    public ResponseEntity<?> getPermitRoles(Authentication authentication){
        ResponseEntity responseEntity = gabApplicantService.getApptypes();
        return responseEntity;
    }
}
