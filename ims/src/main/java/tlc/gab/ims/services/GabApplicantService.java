package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.*;
import tlc.gab.ims.repositories.*;
import tlc.gab.ims.payloads.AddApplicant;
import tlc.gab.ims.utils.GeneralUtil;
import tlc.gab.ims.utils.GetPath;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


@Service
public class GabApplicantService {

    Logger log = LoggerFactory.getLogger(GabApplicantService.class);

    @Autowired
    private GabApplicantRepo applicantRepo;

    @Autowired
    private GabApplicantRequirementsRepo appReqRepo;

    @Autowired
    private RequirementsListRepo reqListRepo;

    @Autowired
    private GabApplicantContactRepo contactRepo;

    @Autowired
    private GabApplicantAddressRepo addressRepo;

    @Autowired
    private GabApplicantGameRecordRepo gameRecordRepo;

    @Autowired
    private PapUserRepo userRepo;

    @Autowired
    private GabApplicantGameRecordRepo gameRepo;

    @Autowired
    private GabApplicantDependantsRepo dependentsRepo;

    @Autowired
    private GabApplicantStatusRecordsRepo statusRecordsRepo;

    @Autowired
    private GabApplicantRefRepo refRepo;

    @Autowired
    private WorkflowRepo workflowRepo;

    @Autowired
    private GabGamesRepo gamesRepo;

    @Autowired
    private WorkflowLinesRepo workflowLinesRepo;

    @Autowired
    private GabApplicantRefRepo gabApplicantRefRepo;

    @Autowired
    private GabApplicantGameRecordLinesRepo gameRecordLinesRepo;

    @Autowired
    private GetPath getPath;

    @Autowired
    private RequirementsListRepo requirementsListRepo;

    @Autowired
    private GabApplicantRequirementsRepo appRequirementsRepo;

    @Autowired
    private ReprintIDListRepo reprintRepo;

    @Autowired
    private ApplicationTypeRepo appTypeRepo;

    @Autowired
    private GameRoleRepo gameRoleRepo;

    @Value("${spring.main.system.url}")
    private String mainUrl;

    private GeneralUtil genUtil = new GeneralUtil();

    public List<GabApplicant> getApplications(String username) {
        List<GabApplicant> applications = new ArrayList<>();
        try {
            applications = applicantRepo.getApplications(username);
        } catch (Exception e) {
            log.error("Can't fetch application list for user: " + username);
        }
        return applications;
    }

    public List<GabApplicant> getFilteredApplications(String username, String month, String year, int appType) {
        List<GabApplicant> applications = new ArrayList<>();
        try {
            String date = year + "-" + month;
            if (appType > 0) {
                applications = applicantRepo.getFilteredApplications(username, date, appType);
            } else {
                applications = applicantRepo.getApplicationsByDate(username, date);
            }
        } catch (Exception e) {
            log.error("Can't fetch application list for user: " + username, e);
        }
        return applications;
    }

    public AddApplicant getApplication(String accountId, String username) {
        AddApplicant applicationDetails = new AddApplicant();
        try {
            GabApplicant applicant = applicantRepo.findByAccountId(accountId);
            PapUser user = userRepo.findByUsername(username);
            List<GabApplicantAddress> addresses = addressRepo.findByAccountId(accountId);
            List<GabApplicantContact> contacts = contactRepo.findByAccountId(accountId);
            GabApplicantGameRecord gameRecord = gameRepo.findByAccountId(accountId);
            String displayPhoto = appRequirementsRepo.getDisplayPhoto(accountId);
            Boolean isNull = displayPhoto==null || displayPhoto.equalsIgnoreCase("");
            if(!isNull){
                applicationDetails.setvAVATAR(displayPhoto.replace("../..", mainUrl));
            }else{
                applicationDetails.setvAVATAR("assets/img/image_placeholder.jpg");
            }

            applicationDetails.setvACCOUNTID(accountId);

            applicationDetails.setvSPORTS(gameRecord.getSports());
            applicationDetails.setvROLES(gameRecord.getRole());
            applicationDetails.setvLICENSE_NUMBER(gameRecord.getLicenseNumber());
            applicationDetails.setvCLUB(gameRecord.getClub());
            applicationDetails.setvRING_NAME(gameRecord.getRingName());
            applicationDetails.setvMANAGER_FIRST_NAME(gameRecord.getManagerFirstName());
            applicationDetails.setvMANAGER_LAST_NAME(gameRecord.getManagerLastName());
            applicationDetails.setvMANAGER_MIDDLE_NAME(gameRecord.getManagerMiddleName());
            applicationDetails.setvMANAGER_NICK_NAME(gameRecord.getManagerNickName());
            applicationDetails.setvPROMOTION_CONTRACT(gameRecord.getPromotionContract());
            applicationDetails.setvGAB_DENIED(gameRecord.getGabDenied());
            applicationDetails.setvFIGHT_RECORD(gameRecord.getFightRecord());
            applicationDetails.setvAMATEUR_RECORD(gameRecord.getAmateurRecord());
            applicationDetails.setvROUNDER(gameRecord.getRounder());
            applicationDetails.setvTRAINING(gameRecord.getTraining());
            applicationDetails.setvPROFESSIONAL_PERIOD(gameRecord.getProfessionalPeriod());

            if (gameRecord.getApplicantDate() != null)
                applicationDetails.setvAPPLICANT_DATE(gameRecord.getApplicantDate().replace('-', '/'));
            else
                applicationDetails.setvAPPLICANT_DATE(gameRecord.getApplicantDate());

            applicationDetails.setvLOCATION(gameRecord.getLocation());

            if (gameRecord.getDateEvent() != null)
                applicationDetails.setvDATE_EVENT(gameRecord.getDateEvent().replace('-', '/'));
            else
                applicationDetails.setvDATE_EVENT(gameRecord.getDateEvent());

            applicationDetails.setvPROCLAMATION(gameRecord.getProclamation());
            applicationDetails.setvBENIFICIARY(gameRecord.getBenificiary());
            applicationDetails.setvREQUEST(gameRecord.getRequest());
            applicationDetails.setvFOREIGN_PARTICIPANTS(gameRecord.getForeignParticipants());
            applicationDetails.setvPROMOTER(gameRecord.getPromoter());
            applicationDetails.setvBOUTS(gameRecord.getBouts());
            applicationDetails.setvTV_COVERAGE(gameRecord.getTvCoverage());
            applicationDetails.setvTICKETS(gameRecord.getTickets());

            if (gameRecord.getDateWeightIn() != null)
                applicationDetails.setvDATE_WEIGHT_IN(gameRecord.getDateWeightIn().replace('-', '/'));
            else
                applicationDetails.setvDATE_WEIGHT_IN(gameRecord.getDateWeightIn());

            applicationDetails.setvTIME_WEIGHTIN(gameRecord.getTimeWeightIn());
            applicationDetails.setvPLACE_WEIGHT_IN(gameRecord.getPlaceWeightIn());
            applicationDetails.setvWEIGHT_SCALE(gameRecord.getWeightScale());
            applicationDetails.setvTIME_EVENT(gameRecord.getTimeEvent());
            applicationDetails.setvPLACE_EVENT(gameRecord.getPlaceEvent());
            applicationDetails.setvTELEPHONE_EVENT(gameRecord.getTelephoneEvent());
            applicationDetails.setvAMBULANCE(gameRecord.getAmbulance());
            applicationDetails.setvHOSPITAL_NEARBY(gameRecord.getHospitalNearby());

            if (gameRecord.getDateStart() != null)
                applicationDetails.setvDATE_START(gameRecord.getDateStart().replace('-', '/'));
            else
                applicationDetails.setvDATE_START(gameRecord.getDateStart());
            if (gameRecord.getDateEnd() != null)
                applicationDetails.setvDATE_END(gameRecord.getDateEnd().replace('-', '/'));
            else
                applicationDetails.setvDATE_END(gameRecord.getDateEnd());

            applicationDetails.setvEVENT(gameRecord.getEvent());
            applicationDetails.setvPERMIT_NUMBER(gameRecord.getPermitNumber());
            applicationDetails.setvAPPLICATION_FOR(gameRecord.getApplicationFor());
            applicationDetails.setvGYM(gameRecord.getGym());

            if (gameRecord.getDateApplied() != null)
                applicationDetails.setvDATE_APPLIED(gameRecord.getDateApplied().replace('-', '/'));
            else
                applicationDetails.setvDATE_APPLIED(gameRecord.getDateApplied());

            if (gameRecord.getDATE_FIGHT() != null)
                applicationDetails.setvDATE_FIGHT(gameRecord.getDATE_FIGHT().replace('-', '/'));
            else
                applicationDetails.setvDATE_FIGHT(gameRecord.getDATE_FIGHT());

            applicationDetails.setvPASSPORT_FIRST_NAME(gameRecord.getPassportFirstName());
            applicationDetails.setvPASSPORT_LAST_NAME(gameRecord.getPassportLastName());
            applicationDetails.setvPASSPORT_MIDDLE_NAME(gameRecord.getPassportMiddleName());
            applicationDetails.setvOPPONENT_FIRST_NAME(gameRecord.getOpponentFirstName());
            applicationDetails.setvOPPONENT_LAST_NAME(gameRecord.getOpponentLastName());
            applicationDetails.setvOPPONENT_MIDDLE_NAME(gameRecord.getOpponentMiddleName());
            applicationDetails.setvOPPONENT_NICK_NAME(gameRecord.getOpponentNickName());
            applicationDetails.setvTITLE_WEIGHT(gameRecord.getTitleWeight());
            applicationDetails.setvROUNDS(gameRecord.getRounds());

            if (gameRecord.getDateContest() != null)
                applicationDetails.setvDATE_CONTEST(gameRecord.getDateContest().replace('-', '/'));
            else
                applicationDetails.setvDATE_CONTEST(gameRecord.getDateContest());

            applicationDetails.setvFIGHT_RECORDS(gameRecord.getFightRecords());
            applicationDetails.setvCONTEST_PLACE(gameRecord.getContestPlace());

            applicationDetails.setvAPPLICATION_TYPE("" + applicant.getApptype());
            applicationDetails.setvSTATUS(applicant.getStatus());
            applicationDetails.setvOFFICE(applicant.getOffice());
            applicationDetails.setvFIRST_NAME(applicant.getFirstName());
            applicationDetails.setvLAST_NAME(applicant.getLastName());
            applicationDetails.setvMIDDLE_NAME(applicant.getMiddleName());
            applicationDetails.setvNICK_NAME(applicant.getNickName());

            if (gameRecord.getDateContest() != null)
                applicationDetails.setvBIRTH_DATE(applicant.getBirthDate().replace('-', '/'));
            else
                applicationDetails.setvBIRTH_DATE(applicant.getBirthDate());

            applicationDetails.setvBIRTH_PLACE(applicant.getBirthPlace());
            applicationDetails.setvGENDER(applicant.getGender());
            applicationDetails.setvAGE(applicant.getAge());
            applicationDetails.setvHEIGHT(applicant.getHeight());
            applicationDetails.setvWEIGHT(applicant.getWeight());
            applicationDetails.setvCITIZENSHIP(applicant.getCitizenship());
            applicationDetails.setvCIVILSTATUS(applicant.getCivilStatus());
            applicationDetails.setvACCUSED_CRIME(applicant.getAccusedCrime());
            applicationDetails.setvSTATE_OFFENSE(applicant.getStateOffense());
            applicationDetails.setvSSS(applicant.getSss());
            applicationDetails.setvHAIR_COLOR(applicant.getColor());
            applicationDetails.setvEYE_COLOR(applicant.getEyeColor());
            applicationDetails.setvEDUCATION_BACKGROUND(applicant.getEducationalBackground());
            String typeCode = workflowRepo.getTypeCode(applicant.getApptype());
            applicationDetails.setvTYPE_CODE(typeCode);

            String sports = gameRecord.getSports();

            Boolean noSport = sports == null || sports.isEmpty();
            if (!noSport) {
                GabGames games = gamesRepo.findByCode(sports);
                String division = games.getClassification();
                applicationDetails.setvDIVISION(division);
            }

            for (GabApplicantAddress address : addresses) {
                if (address.getType() == 1) {
                    applicationDetails.setvHOME_ADDRESS(address.getAddress());
                } else if (address.getType() == 2) {
                    applicationDetails.setvOFFICE_ADDRESS(address.getAddress());
                }
            }

            for (GabApplicantContact contact : contacts) {
                if (contact.getType().equalsIgnoreCase("1")) {
                    applicationDetails.setvTELEPHONE_HOME(contact.getTelephone());
                } else if (contact.getType().equalsIgnoreCase("2")) {
                    applicationDetails.setvTELEPHONE_OFFICE(contact.getTelephone());
                }
            }

            ReprintIDList reprintIDList = reprintRepo.findByAccountId(accountId);
            String idFor = "";
            String reason = "";

            if(!(reprintIDList==null)){
                idFor = reprintIDList.getId_for();
                reason = reprintIDList.getReason();
            }

            log.info(idFor);
            log.info(reason);

            applicationDetails.setvID_FOR(idFor);
            applicationDetails.setvREASONS_FOR_ID_REPRINT(reason);

        } catch (Exception e) {
            log.error("Can't get the application details!", e);
        }
        return applicationDetails;
    }

    public void addGameRecordLines(String accountId, String firstName, String middleName, String lastName, String nickname, String event, String weight, String round, String classification, String title, String createdBy) {
        GabApplicantGameRecordLines gameRecordLine = new GabApplicantGameRecordLines();
        GabApplicantGameRecord gameRecord = gameRepo.findByAccountId(accountId);
        String code = gameRecord.getCode();

        gameRecordLine.setCode(code);
        gameRecordLine.setFirstName(firstName);
        gameRecordLine.setMiddleName(middleName);
        gameRecordLine.setLastName(lastName);
        gameRecordLine.setNickName(nickname);
        gameRecordLine.setEvent(event);
        gameRecordLine.setWeight(weight);
        gameRecordLine.setRound(round);
        gameRecordLine.setClassification(classification);
        gameRecordLine.setTitle(title);
        gameRecordLine.setCreatedBy(createdBy);

        gameRecordLinesRepo.save(gameRecordLine);
    }

    public ResponseEntity<?> addApplicantV2(AddApplicant applicant, String Username) {
        ResponseEntity response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        String data = "";
        try {
            String applicantId = "";

            AddApplicant addApp = new AddApplicant();
            GabApplicantGameRecord gameRecord = new GabApplicantGameRecord();
            GabApplicant appInfo = new GabApplicant();
            GabApplicantAddress homeAddress = new GabApplicantAddress();
            GabApplicantAddress officeAddress = new GabApplicantAddress();
            GabApplicantContact homeContact = new GabApplicantContact();
            GabApplicantContact officeContact = new GabApplicantContact();
            GabApplicantDependants dependent = new GabApplicantDependants();
            GabApplicantStatusRecords statusRecords = new GabApplicantStatusRecords();
            GabApplicantRef applicantRef = new GabApplicantRef();
            ReprintIDList reprintIdDtls = new ReprintIDList();
            Boolean blankAccountID = applicant.getvACCOUNTID() == null;

            if(!blankAccountID){
                applicantId = applicant.getvACCOUNTID();
                gameRecord = gameRecordRepo.findByAccountId(applicantId);
                appInfo = applicantRepo.findByAccountId(applicantId);
                homeAddress = addressRepo.findAddress(applicantId,1);
                officeAddress = addressRepo.findAddress(applicantId,2);
                homeContact = contactRepo.findContact(applicantId,"1");
                officeContact = contactRepo.findContact(applicantId,"2");
                dependent = dependentsRepo.findByAccountId(applicantId);
                reprintIdDtls = reprintRepo.findByAccountId(applicantId);

                Boolean noStatusRecord = statusRecordsRepo.findByAccountId(applicantId) == null;
                Boolean noRefRecord = gabApplicantRefRepo.findByAccountId(applicantId) == null;

                if(!noStatusRecord && !noRefRecord){
                    statusRecords = statusRecordsRepo.findByAccountId(applicantId);
                    applicantRef = gabApplicantRefRepo.findByAccountId(applicantId);
                }

            }else{
                applicantId = applicantRepo.generateId("gab_applicant");
            }

            appInfo.setAccountId(applicantId);
            appInfo.setFirstName(applicant.getvFIRST_NAME());
            appInfo.setLastName(applicant.getvLAST_NAME());
            appInfo.setMiddleName(applicant.getvMIDDLE_NAME());
            appInfo.setNickName(applicant.getvNICK_NAME());

            String birthDate = applicant.getvBIRTH_DATE();

            if (birthDate != null) {
                String[] bDate = applicant.getvBIRTH_DATE().split(",");
                String[] bd = bDate[0].split("/");
                String newBDate = bd[2] + "-" + bd[0] + "-" + bd[1];
                appInfo.setBirthDate(newBDate);
            } else {
                appInfo.setBirthDate("0000-00-00");
            }

            appInfo.setBirthPlace(applicant.getvBIRTH_PLACE());
            appInfo.setAge(applicant.getvAGE());
            appInfo.setGender(applicant.getvGENDER());
            appInfo.setHeight(applicant.getvHEIGHT());
            appInfo.setWeight(applicant.getvWEIGHT());
            appInfo.setColor(applicant.getvHAIR_COLOR());
            appInfo.setEyeColor(applicant.getvEYE_COLOR());
            appInfo.setCitizenship(applicant.getvCITIZENSHIP());
            appInfo.setCivilStatus(applicant.getvCIVILSTATUS());
            appInfo.setSss(applicant.getvSSS());
            appInfo.setEducationalBackground(applicant.getvEDUCATION_BACKGROUND());

            String crime = applicant.getvSTATE_OFFENSE();

            Boolean withOffense = crime == null || crime.isEmpty();

            if (!withOffense) {
                String withCrime = "YES";
                String off = applicant.getvSTATE_OFFENSE();
                if (off.isEmpty()) {
                    withCrime = "NO";
                }
                appInfo.setAccusedCrime(withCrime);
                appInfo.setStateOffense(applicant.getvSTATE_OFFENSE());
            }else{
                appInfo.setAccusedCrime(null);
                appInfo.setStateOffense(null);
            }

            // Set application type
            String appliType = applicant.getvAPPLICATION_TYPE();
            int appType = 0;

            GabGames games = gamesRepo.findByCode(applicant.getvSPORTS());
            String division = games.getClassification();

            log.info("appliType : "+appliType);

            if(appliType.equalsIgnoreCase("I")){
                String workflow = workflowRepo.findWorkflow(division, 7);
                String stat = workflowLinesRepo.findByCode(workflow, "1");
                appInfo.setStatus(stat);
                appInfo.setApptype(7);

            }else if(appliType.equalsIgnoreCase("L")){
                log.info(applicant.getvROLES()+" || "+division+" || "+appliType);
                String workflow = workflowRepo.getWorkflowFor(applicant.getvROLES(),division,appliType);
                log.info("My workflow: "+workflow);
                Workflow wf = workflowRepo.findWorkflowV3(workflow);
//                appType = Integer.parseInt(wf.getTranstype());

                String stat = workflowLinesRepo.findByCode(wf.getCode(), "1");
                appInfo.setStatus(stat);
                appInfo.setApptype(Integer.parseInt(wf.getTranstype()));
            }else{
                int appTypeNum = Integer.parseInt(appliType);
                appInfo.setApptype(appTypeNum);

                String workflow = workflowRepo.findWorkflow(division, appTypeNum);
                String stat = workflowLinesRepo.findByCode(workflow, "1");
                log.info(workflow);
                log.info(stat);
                appInfo.setStatus(stat);
            }

            appInfo.setOffice(applicant.getvOFFICE());
            appInfo.setCreatedBy(Username);
            appInfo.setModifiedBy(Username);

            // Set home address
            homeAddress.setAccountId(applicantId);
            homeAddress.setAddress(applicant.getvHOME_ADDRESS());
            homeAddress.setType(1);
            homeAddress.setCreatedBy(Username);
            homeAddress.setModifiedBy(Username);

            // Set office address
            officeAddress.setAccountId(applicantId);
            officeAddress.setAddress(applicant.getvOFFICE_ADDRESS());
            officeAddress.setType(2);
            officeAddress.setCreatedBy(Username);
            officeAddress.setModifiedBy(Username);

            // Set home contact
            homeContact.setAccountId(applicantId);
            homeContact.setTelephone(applicant.getvTELEPHONE_HOME());
            homeContact.setType("1");
            homeContact.setCreatedBy(Username);
            homeContact.setModifiedBy(Username);

            // Set officeContact
            officeContact.setAccountId(applicantId);
            officeContact.setTelephone(applicant.getvTELEPHONE_OFFICE());
            officeContact.setType("2");
            officeContact.setCreatedBy(Username);
            officeContact.setModifiedBy(Username);

            gameRecord.setCode(applicantRepo.generateId("gab_applicant_game_record"));
            gameRecord.setAccountId(applicantId);
            gameRecord.setSports(applicant.getvSPORTS());
            gameRecord.setRole(applicant.getvROLES());
            gameRecord.setLicenseNumber(applicant.getvLICENSE_NUMBER());
            gameRecord.setClub(applicant.getvCLUB());
            gameRecord.setRingName(applicant.getvRING_NAME());
            gameRecord.setPromotionContract(applicant.getvPROMOTION_CONTRACT());
            gameRecord.setGabDenied(applicant.getvGAB_DENIED());
            gameRecord.setManagerFirstName(applicant.getvMANAGER_FIRST_NAME());
            gameRecord.setManagerMiddleName(applicant.getvMANAGER_MIDDLE_NAME());
            gameRecord.setManagerLastName(applicant.getvMANAGER_LAST_NAME());
            gameRecord.setManagerNickName(applicant.getvMANAGER_NICK_NAME());
            gameRecord.setTraining(applicant.getvTRAINING());
            gameRecord.setRounder(applicant.getvROUNDER());
            gameRecord.setFightRecord(applicant.getvFIGHT_RECORD());
            gameRecord.setFightRecords(applicant.getvFIGHT_RECORDS());
            gameRecord.setAmateurRecord(applicant.getvAMATEUR_RECORD());
            gameRecord.setProfessionalPeriod(applicant.getvPROFESSIONAL_PERIOD());
            gameRecord.setApplicantDate(applicant.getvAPPLICANT_DATE());
            gameRecord.setLocation(applicant.getvLOCATION());

            if (applicant.getvDATE_EVENT() == null || applicant.getvDATE_EVENT().isEmpty()) {
                applicant.setvDATE_EVENT(null);
            } else{
                String dateEvent = applicant.getvDATE_EVENT();
                String[] dateEventArr = dateEvent.split("/");
                dateEvent = dateEventArr[2]+dateEventArr[0]+dateEventArr[1];
                applicant.setvDATE_EVENT(dateEvent);
            }

            gameRecord.setProclamation(applicant.getvPROCLAMATION());
            gameRecord.setBenificiary(applicant.getvBENIFICIARY());
            gameRecord.setRequest(applicant.getvREQUEST());
            gameRecord.setForeignParticipants(applicant.getvFOREIGN_PARTICIPANTS());
            gameRecord.setPromoter(applicant.getvPROMOTER());
            gameRecord.setBouts(applicant.getvBOUTS());
            gameRecord.setTvCoverage(applicant.getvTV_COVERAGE());
            gameRecord.setTickets(applicant.getvTICKETS());
            gameRecord.setDateWeightIn(applicant.getvDATE_WEIGHT_IN());
            gameRecord.setTimeWeightIn(applicant.getvDATE_WEIGHT_IN());
            gameRecord.setPlaceWeightIn(applicant.getvPLACE_WEIGHT_IN());
            gameRecord.setPlaceWeightIn(applicant.getvPLACE_WEIGHT_IN());
            gameRecord.setWeightScale(applicant.getvWEIGHT_SCALE());
            gameRecord.setTimeEvent(applicant.getvTIME_EVENT());
            gameRecord.setPlaceEvent(applicant.getvPLACE_EVENT());
            gameRecord.setTelephoneEvent(applicant.getvTELEPHONE_EVENT());
            gameRecord.setAmbulance(applicant.getvAMBULANCE());
            gameRecord.setHospitalNearby(applicant.getvHOSPITAL_NEARBY());

            String dateStart = applicant.getvDATE_START();
            String dateEnd = applicant.getvDATE_END();

            Boolean noStartDate = dateStart == null || dateStart.isEmpty();
            Boolean noEndDate = dateEnd == null || dateEnd.isEmpty();

            if (!noStartDate) {
                String[] ds = dateStart.split("/");
                if (ds[2].length() == 4) {
                    String newDateStart = ds[2] + "-" + ds[0] + "-" + ds[1];
                    gameRecord.setDateStart(newDateStart);
                } else
                    gameRecord.setDateStart(null);
            }else{
                gameRecord.setDateStart(null);
            }

            if (!noEndDate) {
                String[] de = dateEnd.split("/");
                if (de[2].length() == 4) {
                    String newDateEnd = de[2] + "-" + de[0] + "-" + de[1];
                    gameRecord.setDateEnd(newDateEnd);
                } else
                    gameRecord.setDateEnd(null);
            }else{
                gameRecord.setDateEnd(null);
            }

            gameRecord.setEvent(applicant.getvEVENT());
            gameRecord.setPermitNumber(applicant.getvPERMIT_NUMBER());
            gameRecord.setApplicationFor(applicant.getvAPPLICATION_FOR());
            gameRecord.setGym(applicant.getvGYM());
            gameRecord.setDateApplied(applicant.getvDATE_APPLIED());
            gameRecord.setDATE_FIGHT(applicant.getvDATE_FIGHT());
            gameRecord.setPassportFirstName(applicant.getvPASSPORT_FIRST_NAME());
            gameRecord.setPassportLastName(applicant.getvPASSPORT_LAST_NAME());
            gameRecord.setPassportMiddleName(applicant.getvPASSPORT_MIDDLE_NAME());
            gameRecord.setOpponentFirstName(applicant.getvOPPONENT_FIRST_NAME());
            gameRecord.setOpponentLastName(applicant.getvOPPONENT_LAST_NAME());
            gameRecord.setOpponentMiddleName(applicant.getvOPPONENT_MIDDLE_NAME());
            gameRecord.setOpponentNickName(applicant.getvOPPONENT_NICK_NAME());
            gameRecord.setTitleWeight(applicant.getvTITLE_WEIGHT());
            gameRecord.setRounds(applicant.getvROUNDS());
            gameRecord.setDateContest(applicant.getvDATE_CONTEST());
            gameRecord.setFightRecord(applicant.getvFIGHT_RECORD());
            gameRecord.setContestPlace(applicant.getvCONTEST_PLACE());
            gameRecord.setCreatedBy(Username);
            gameRecord.setModifiedBy(Username);

            gameRecord.setDateEvent(applicant.getvDATE_EVENT());

            gameRecord.setAccompanyFirstName(applicant.getvMANAGER_FIRST_NAME());
            gameRecord.setAccompanyMiddleName(applicant.getvMANAGER_MIDDLE_NAME());
            gameRecord.setAccompanyLastName(applicant.getvMANAGER_LAST_NAME());
            gameRecord.setAccompanyNickName(applicant.getvMANAGER_NICK_NAME());
            gameRecord.setFightRecord(applicant.getvFIGHT_RECORDS());
            gameRecord.setIssuedDate(null);
            gameRecord.setValidationDate(null);
            gameRecord.setSignatory(null);

            dependent.setAccountId(applicantId);
            dependent.setParentsFirstName(applicant.getvPARENTS_FIRST_NAME());
            dependent.setParentsLastName(applicant.getvPARENTS_LAST_NAME());
            dependent.setParentsMiddleName(applicant.getvPARENTS_MIDDLE_NAME());
            dependent.setParentsNickName(applicant.getvPARENTS_NICK_NAME());
            dependent.setCreatedBy(Username);
            dependent.setModifiedBy(Username);

            applicantRef.setRefNum(applicantRepo.generateId("gab_applicant_ref"));
            applicantRef.setAccountId(applicantId);
            applicantRef.setCreatedBy(Username);

            //--------------------------------------------------------------------------------------------------------------------------------

            Boolean draft = applicant.getvSAVE_AS_DRAFT().equalsIgnoreCase("YES");
            log.info("Save as draft: "+applicant.getvSAVE_AS_DRAFT());
            if(!draft){

                statusRecords.setStatus(appInfo.getStatus());
                statusRecords.setRemarks("");
                statusRecords.setAccountId(applicantId);
                statusRecords.setSequence("1");
                statusRecords.setCreatedBy(Username);
                statusRecords.setRole(gameRecord.getRole());
            }else{
                appInfo.setStatus("AS0000");
            }

            if(!draft){
                //Saving status record and reference
                statusRecordsRepo.save(statusRecords);
                refRepo.save(applicantRef);
            }

            //Saving applicant info
            applicantRepo.save(appInfo);

            //Saving addresses
            addressRepo.save(homeAddress);
            addressRepo.save(officeAddress);

            //Saving contacts
            contactRepo.save(homeContact);
            contactRepo.save(officeContact);

            //Saving game record
            gameRepo.save(gameRecord);

            if(appType==7){
                reprintIdDtls.setAccount_id(applicantId);
                reprintIdDtls.setId_for(applicant.getvID_FOR());
                reprintIdDtls.setReason(applicant.getvREASONS_FOR_ID_REPRINT());
                reprintRepo.save(reprintIdDtls);
            }

            String classification = "CONTENDER";
            String title = "TITLE";
            addGameRecordLines(applicantId, applicant.getvFIRST_NAME(), applicant.getvMIDDLE_NAME(), applicant.getvLAST_NAME(),
                    applicant.getvNICK_NAME(), applicant.getvEVENT(), applicant.getvWEIGHT(), applicant.getvROUNDS(), classification,
                    title, Username);

            //Saving dependent
            dependentsRepo.save(dependent);

            PapUser usr = userRepo.findByUsername(Username);
            String profilePath = usr.getPhotosImagePath();
            String uploadPath = getPath.getUploadPath();
            String basePath = System.getProperty("user.dir");
            basePath = basePath.replace("\\", "/");
            String newProfilePath = basePath + profilePath;

            File source = new File(newProfilePath);
            String avatar = usr.getAvatar();
            Boolean wAvatar = avatar == null;
            File destination = new File("");
            if (!wAvatar) {
                String[] avatarFile = avatar.split("\\.");
                String newAvatarName = applicantId + "." + avatarFile[1];
                destination = new File(uploadPath + newAvatarName);
            }
            response = new ResponseEntity(applicantId, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!", e);
        }
        return response;
    }

    public ResponseEntity getPermitTypes(String division) {
        ResponseEntity response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            List<ApplicationType> permitTypes = appTypeRepo.getPermitTypesByDivision(division);
            if(permitTypes == null){
                response = new ResponseEntity<>("No Data Found!", HttpStatus.NOT_FOUND);
            }else{
                response = new ResponseEntity<>(permitTypes, HttpStatus.OK);
            }
        }catch(Exception e){
            log.error("Failed!", e);
        }
        return response;
    }

    public ResponseEntity getApptypes() {
        ResponseEntity response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            List<ApplicationType> permitTypes = appTypeRepo.findAll();
            response = new ResponseEntity<>(permitTypes, HttpStatus.OK);
        }catch (Exception e){
            log.error("Failed!", e);
        }
        return response;
    }

    public ResponseEntity<?> addApplicantWalkIn(AddApplicant applicant) {
        ResponseEntity response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        String data = "";
        try {
            String applicantId = "";

            String Username = applicant.getvUSERNAME();

            AddApplicant addApp = new AddApplicant();
            GabApplicantGameRecord gameRecord = new GabApplicantGameRecord();
            GabApplicant appInfo = new GabApplicant();
            GabApplicantAddress homeAddress = new GabApplicantAddress();
            GabApplicantAddress officeAddress = new GabApplicantAddress();
            GabApplicantContact homeContact = new GabApplicantContact();
            GabApplicantContact officeContact = new GabApplicantContact();
            GabApplicantDependants dependent = new GabApplicantDependants();
            GabApplicantStatusRecords statusRecords = new GabApplicantStatusRecords();
            GabApplicantRef applicantRef = new GabApplicantRef();
            ReprintIDList reprintIdDtls = new ReprintIDList();
            Boolean blankAccountID = applicant.getvACCOUNTID() == null;

            if(!blankAccountID){
                applicantId = applicant.getvACCOUNTID();
                gameRecord = gameRecordRepo.findByAccountId(applicantId);
                appInfo = applicantRepo.findByAccountId(applicantId);
                homeAddress = addressRepo.findAddress(applicantId,1);
                officeAddress = addressRepo.findAddress(applicantId,2);
                homeContact = contactRepo.findContact(applicantId,"1");
                officeContact = contactRepo.findContact(applicantId,"2");
                dependent = dependentsRepo.findByAccountId(applicantId);
                reprintIdDtls = reprintRepo.findByAccountId(applicantId);

                Boolean noStatusRecord = statusRecordsRepo.findByAccountId(applicantId) == null;
                Boolean noRefRecord = gabApplicantRefRepo.findByAccountId(applicantId) == null;

                if(!noStatusRecord && !noRefRecord){
                    statusRecords = statusRecordsRepo.findByAccountId(applicantId);
                    applicantRef = gabApplicantRefRepo.findByAccountId(applicantId);
                }

            }else{
                applicantId = applicantRepo.generateId("gab_applicant");
            }

            appInfo.setAccountId(applicantId);
            appInfo.setFirstName(applicant.getvFIRST_NAME());
            log.info(applicant.getvFIRST_NAME());
            appInfo.setLastName(applicant.getvLAST_NAME());
            appInfo.setMiddleName(applicant.getvMIDDLE_NAME());
            appInfo.setNickName(applicant.getvNICK_NAME());

            String birthDate = applicant.getvBIRTH_DATE();

            if (birthDate != null) {
                String[] bDate = applicant.getvBIRTH_DATE().split(",");
                String[] bd = bDate[0].split("/");
                String newBDate = bd[2] + "-" + bd[0] + "-" + bd[1];
                appInfo.setBirthDate(newBDate);
            } else {
                appInfo.setBirthDate("0000-00-00");
            }

            appInfo.setBirthPlace(applicant.getvBIRTH_PLACE());
            appInfo.setAge(applicant.getvAGE());
            appInfo.setGender(applicant.getvGENDER());
            appInfo.setHeight(applicant.getvHEIGHT());
            appInfo.setWeight(applicant.getvWEIGHT());
            appInfo.setColor(applicant.getvHAIR_COLOR());
            appInfo.setEyeColor(applicant.getvEYE_COLOR());
            appInfo.setCitizenship(applicant.getvCITIZENSHIP());
            appInfo.setCivilStatus(applicant.getvCIVILSTATUS());
            appInfo.setSss(applicant.getvSSS());
            appInfo.setEducationalBackground(applicant.getvEDUCATION_BACKGROUND());

            String crime = applicant.getvSTATE_OFFENSE();

            Boolean withOffense = crime == null || crime.isEmpty();

            if (!withOffense) {
                String withCrime = "YES";
                String off = applicant.getvSTATE_OFFENSE();
                if (off.isEmpty()) {
                    withCrime = "NO";
                }
                appInfo.setAccusedCrime(withCrime);
                appInfo.setStateOffense(applicant.getvSTATE_OFFENSE());
            }else{
                appInfo.setAccusedCrime(null);
                appInfo.setStateOffense(null);
            }

            // Set application type
            String appliType = applicant.getvAPPLICATION_TYPE();
            int appType = 0;

            log.info("sports : "+applicant.getvSPORTS());

            GabGames games = gamesRepo.findByCode(applicant.getvSPORTS());
            log.info(applicant.getvSPORTS());
            String division = games.getClassification();

            if(appliType.equalsIgnoreCase("I")){
                String workflow = workflowRepo.findWorkflow(division, 7);
                String stat = workflowLinesRepo.findByCode(workflow, "1");
                appInfo.setStatus(stat);
                appInfo.setApptype(7);

            }else if(appliType.equalsIgnoreCase("L")){
                log.info(applicant.getvROLES()+" || "+division+" || "+appliType);
                String workflow = workflowRepo.getWorkflowFor(applicant.getvROLES(),division,appliType);
                log.info("My workflow: "+workflow);
                Workflow wf = workflowRepo.findWorkflowV3(workflow);
//                appType = Integer.parseInt(wf.getTranstype());

                String stat = workflowLinesRepo.findByCode(wf.getCode(), "1");
                appInfo.setStatus(stat);
                appInfo.setApptype(Integer.parseInt(wf.getTranstype()));
            }else{
                int appTypeNum = Integer.parseInt(appliType);
                appInfo.setApptype(appTypeNum);

                String workflow = workflowRepo.findWorkflow(division, appTypeNum);
                String stat = workflowLinesRepo.findByCode(workflow, "1");
                log.info(workflow);
                log.info(stat);
                appInfo.setStatus(stat);
            }

            appInfo.setOffice(applicant.getvOFFICE());
            appInfo.setCreatedBy(Username);
            appInfo.setModifiedBy(Username);

            // Set home address
            homeAddress.setAccountId(applicantId);
            homeAddress.setAddress(applicant.getvHOME_ADDRESS());
            homeAddress.setType(1);
            homeAddress.setCreatedBy(Username);
            homeAddress.setModifiedBy(Username);

            // Set office address
            officeAddress.setAccountId(applicantId);
            officeAddress.setAddress(applicant.getvOFFICE_ADDRESS());
            officeAddress.setType(2);
            officeAddress.setCreatedBy(Username);
            officeAddress.setModifiedBy(Username);

            // Set home contact
            homeContact.setAccountId(applicantId);
            homeContact.setTelephone(applicant.getvTELEPHONE_HOME());
            homeContact.setType("1");
            homeContact.setCreatedBy(Username);
            homeContact.setModifiedBy(Username);

            // Set officeContact
            officeContact.setAccountId(applicantId);
            officeContact.setTelephone(applicant.getvTELEPHONE_OFFICE());
            officeContact.setType("2");
            officeContact.setCreatedBy(Username);
            officeContact.setModifiedBy(Username);

            gameRecord.setCode(applicantRepo.generateId("gab_applicant_game_record"));
            gameRecord.setAccountId(applicantId);
            gameRecord.setSports(applicant.getvSPORTS());
            gameRecord.setRole(applicant.getvROLES());
            gameRecord.setLicenseNumber(applicant.getvLICENSE_NUMBER());
            gameRecord.setClub(applicant.getvCLUB());
            gameRecord.setRingName(applicant.getvRING_NAME());
            gameRecord.setPromotionContract(applicant.getvPROMOTION_CONTRACT());
            gameRecord.setGabDenied(applicant.getvGAB_DENIED());
            gameRecord.setManagerFirstName(applicant.getvMANAGER_FIRST_NAME());
            gameRecord.setManagerMiddleName(applicant.getvMANAGER_MIDDLE_NAME());
            gameRecord.setManagerLastName(applicant.getvMANAGER_LAST_NAME());
            gameRecord.setManagerNickName(applicant.getvMANAGER_NICK_NAME());
            gameRecord.setTraining(applicant.getvTRAINING());
            gameRecord.setRounder(applicant.getvROUNDER());
            gameRecord.setFightRecord(applicant.getvFIGHT_RECORD());
            gameRecord.setFightRecords(applicant.getvFIGHT_RECORDS());
            gameRecord.setAmateurRecord(applicant.getvAMATEUR_RECORD());
            gameRecord.setProfessionalPeriod(applicant.getvPROFESSIONAL_PERIOD());
            gameRecord.setApplicantDate(applicant.getvAPPLICANT_DATE());
            gameRecord.setLocation(applicant.getvLOCATION());

            if (applicant.getvDATE_EVENT() == null || applicant.getvDATE_EVENT().isEmpty()) {
                applicant.setvDATE_EVENT(null);
            } else{
                String dateEvent = applicant.getvDATE_EVENT();
                String[] dateEventArr = dateEvent.split("/");
                dateEvent = dateEventArr[2]+dateEventArr[0]+dateEventArr[1];
                applicant.setvDATE_EVENT(dateEvent);
            }

            gameRecord.setProclamation(applicant.getvPROCLAMATION());
            gameRecord.setBenificiary(applicant.getvBENIFICIARY());
            gameRecord.setRequest(applicant.getvREQUEST());
            gameRecord.setForeignParticipants(applicant.getvFOREIGN_PARTICIPANTS());
            gameRecord.setPromoter(applicant.getvPROMOTER());
            gameRecord.setBouts(applicant.getvBOUTS());
            gameRecord.setTvCoverage(applicant.getvTV_COVERAGE());
            gameRecord.setTickets(applicant.getvTICKETS());
            gameRecord.setDateWeightIn(applicant.getvDATE_WEIGHT_IN());
            gameRecord.setTimeWeightIn(applicant.getvDATE_WEIGHT_IN());
            gameRecord.setPlaceWeightIn(applicant.getvPLACE_WEIGHT_IN());
            gameRecord.setPlaceWeightIn(applicant.getvPLACE_WEIGHT_IN());
            gameRecord.setWeightScale(applicant.getvWEIGHT_SCALE());
            gameRecord.setTimeEvent(applicant.getvTIME_EVENT());
            gameRecord.setPlaceEvent(applicant.getvPLACE_EVENT());
            gameRecord.setTelephoneEvent(applicant.getvTELEPHONE_EVENT());
            gameRecord.setAmbulance(applicant.getvAMBULANCE());
            gameRecord.setHospitalNearby(applicant.getvHOSPITAL_NEARBY());

            String dateStart = applicant.getvDATE_START();
            String dateEnd = applicant.getvDATE_END();

            Boolean noStartDate = dateStart == null || dateStart.isEmpty();
            Boolean noEndDate = dateEnd == null || dateEnd.isEmpty();

            log.info("dateStart : "+dateStart);
            log.info("dateEnd : "+dateEnd);

            if (!noStartDate && dateStart.contains("/")) {
                String[] ds = dateStart.split("/");
                if (ds[2].length() == 4) {
                    String newDateStart = ds[2] + "-" + ds[0] + "-" + ds[1];
                    gameRecord.setDateStart(newDateStart);
                } else
                    gameRecord.setDateStart(null);
            }else{
                gameRecord.setDateStart(null);
            }

            if (!noEndDate && dateEnd.contains("/")) {
                String[] de = dateEnd.split("/");
                if (de[2].length() == 4) {
                    String newDateEnd = de[2] + "-" + de[0] + "-" + de[1];
                    gameRecord.setDateEnd(newDateEnd);
                } else
                    gameRecord.setDateEnd(null);
            }else{
                gameRecord.setDateEnd(null);
            }

            gameRecord.setEvent(applicant.getvEVENT());
            gameRecord.setPermitNumber(applicant.getvPERMIT_NUMBER());
            gameRecord.setApplicationFor(applicant.getvAPPLICATION_FOR());
            gameRecord.setGym(applicant.getvGYM());
            gameRecord.setDateApplied(applicant.getvDATE_APPLIED());
            gameRecord.setDATE_FIGHT(applicant.getvDATE_FIGHT());
            gameRecord.setPassportFirstName(applicant.getvPASSPORT_FIRST_NAME());
            gameRecord.setPassportLastName(applicant.getvPASSPORT_LAST_NAME());
            gameRecord.setPassportMiddleName(applicant.getvPASSPORT_MIDDLE_NAME());
            gameRecord.setOpponentFirstName(applicant.getvOPPONENT_FIRST_NAME());
            gameRecord.setOpponentLastName(applicant.getvOPPONENT_LAST_NAME());
            gameRecord.setOpponentMiddleName(applicant.getvOPPONENT_MIDDLE_NAME());
            gameRecord.setOpponentNickName(applicant.getvOPPONENT_NICK_NAME());
            gameRecord.setTitleWeight(applicant.getvTITLE_WEIGHT());
            gameRecord.setRounds(applicant.getvROUNDS());
            gameRecord.setDateContest(applicant.getvDATE_CONTEST());
            gameRecord.setFightRecord(applicant.getvFIGHT_RECORD());
            gameRecord.setContestPlace(applicant.getvCONTEST_PLACE());
            gameRecord.setCreatedBy(Username);
            gameRecord.setModifiedBy(Username);

            gameRecord.setDateEvent(applicant.getvDATE_EVENT());

            gameRecord.setAccompanyFirstName(applicant.getvMANAGER_FIRST_NAME());
            gameRecord.setAccompanyMiddleName(applicant.getvMANAGER_MIDDLE_NAME());
            gameRecord.setAccompanyLastName(applicant.getvMANAGER_LAST_NAME());
            gameRecord.setAccompanyNickName(applicant.getvMANAGER_NICK_NAME());
            gameRecord.setFightRecord(applicant.getvFIGHT_RECORDS());
            gameRecord.setIssuedDate(null);
            gameRecord.setValidationDate(null);
            gameRecord.setSignatory(null);

            dependent.setAccountId(applicantId);
            dependent.setParentsFirstName(applicant.getvPARENTS_FIRST_NAME());
            dependent.setParentsLastName(applicant.getvPARENTS_LAST_NAME());
            dependent.setParentsMiddleName(applicant.getvPARENTS_MIDDLE_NAME());
            dependent.setParentsNickName(applicant.getvPARENTS_NICK_NAME());
            dependent.setCreatedBy(Username);
            dependent.setModifiedBy(Username);

            applicantRef.setRefNum(applicantRepo.generateId("gab_applicant_ref"));
            applicantRef.setAccountId(applicantId);
            applicantRef.setCreatedBy(Username);

            //--------------------------------------------------------------------------------------------------------------------------------

            Boolean draft = applicant.getvSAVE_AS_DRAFT().equalsIgnoreCase("YES");
            log.info("Save as draft: "+applicant.getvSAVE_AS_DRAFT());
            if(!draft){

                statusRecords.setStatus(appInfo.getStatus());
                statusRecords.setRemarks("");
                statusRecords.setAccountId(applicantId);
                statusRecords.setSequence("1");
                statusRecords.setCreatedBy(Username);
                statusRecords.setRole(gameRecord.getRole());
            }else{
                appInfo.setStatus("AS0000");
            }

            if(!draft){
                //Saving status record and reference
                statusRecordsRepo.save(statusRecords);
                refRepo.save(applicantRef);
            }

            //Saving applicant info
            applicantRepo.save(appInfo);

            //Saving addresses
            addressRepo.save(homeAddress);
            addressRepo.save(officeAddress);

            //Saving contacts
            contactRepo.save(homeContact);
            contactRepo.save(officeContact);

            //Saving game record
            gameRepo.save(gameRecord);

            if(appType==7){
                reprintIdDtls.setAccount_id(applicantId);
                reprintIdDtls.setId_for(applicant.getvID_FOR());
                reprintIdDtls.setReason(applicant.getvREASONS_FOR_ID_REPRINT());
                reprintRepo.save(reprintIdDtls);
            }

            String classification = "CONTENDER";
            String title = "TITLE";
            addGameRecordLines(applicantId, applicant.getvFIRST_NAME(), applicant.getvMIDDLE_NAME(), applicant.getvLAST_NAME(),
                    applicant.getvNICK_NAME(), applicant.getvEVENT(), applicant.getvWEIGHT(), applicant.getvROUNDS(), classification,
                    title, Username);

            //Saving dependent
            dependentsRepo.save(dependent);

//            PapUser usr = userRepo.findByUsername(Username);
//            String profilePath = usr.getPhotosImagePath();
//            String uploadPath = getPath.getUploadPath();
//            String basePath = System.getProperty("user.dir");
//            basePath = basePath.replace("\\", "/");
//            String newProfilePath = basePath + profilePath;
//
//            File source = new File(newProfilePath);
//            String avatar = usr.getAvatar();
//            Boolean wAvatar = avatar == null;
//            File destination = new File("");
//            if (!wAvatar) {
//                String[] avatarFile = avatar.split("\\.");
//                String newAvatarName = applicantId + "." + avatarFile[1];
//                destination = new File(uploadPath + newAvatarName);
//            }
            response = new ResponseEntity(applicantId, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!", e);
        }
        return response;
    }
}
