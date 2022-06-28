package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.GabPermittee;
import tlc.gab.ims.entities.GabPermitteeAddress;
import tlc.gab.ims.entities.GabPermitteeContact;
import tlc.gab.ims.entities.GabPermitteeGameRecord;
import tlc.gab.ims.repositories.GabPermitteeAddressRepo;
import tlc.gab.ims.repositories.GabPermitteeContactRepo;
import tlc.gab.ims.repositories.GabPermitteeGameRecordRepo;
import tlc.gab.ims.repositories.GabPermitteeRepo;
import tlc.gab.ims.payloads.AddApplicant;

import java.util.List;

@Service
public class GabPermitteeGameRecordService {

    Logger log = LoggerFactory.getLogger(GabLicenseeGameRecordService.class);

    @Autowired
    private GabPermitteeGameRecordRepo gameRecordRepo;

    @Autowired
    private GabPermitteeRepo permitteeRepo;

    @Autowired
    private GabPermitteeAddressRepo addressRepo;

    @Autowired
    private GabPermitteeContactRepo contactRepo;

    public AddApplicant searchPermitApplication(String permitNumber, String username){
        AddApplicant applicationDetails = new AddApplicant();
        try{
        	GabPermitteeGameRecord gameRecord = gameRecordRepo.searchByPermitNumber(permitNumber, username);
            if(gameRecord != null){
                String accountId = gameRecord.getAccountId();
                GabPermittee applicant = permitteeRepo.findByAccountId(accountId);
                List<GabPermitteeContact> contacts = contactRepo.findByAccountId(accountId);
                List<GabPermitteeAddress> addresses = addressRepo.findByAccountId(accountId);

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
                applicationDetails.setvAPPLICANT_DATE(gameRecord.getApplicantDate());
                applicationDetails.setvLOCATION(gameRecord.getLocation());
                applicationDetails.setvDATE_EVENT(gameRecord.getDateEvent());
                applicationDetails.setvPROCLAMATION(gameRecord.getProclamation());
                applicationDetails.setvBENIFICIARY(gameRecord.getBenificiary());
                applicationDetails.setvREQUEST(gameRecord.getRequest());
                applicationDetails.setvFOREIGN_PARTICIPANTS(gameRecord.getForeignParticipants());
                applicationDetails.setvPROMOTER(gameRecord.getPromoter());
                applicationDetails.setvBOUTS(gameRecord.getBouts());
                applicationDetails.setvTV_COVERAGE(gameRecord.getTvCoverage());
                applicationDetails.setvTICKETS(gameRecord.getTickets());
                applicationDetails.setvDATE_WEIGHT_IN(gameRecord.getDateWeightIn());
                applicationDetails.setvTIME_WEIGHTIN(gameRecord.getTimeWeightIn());
                applicationDetails.setvPLACE_WEIGHT_IN(gameRecord.getPlaceWeightIn());
                applicationDetails.setvWEIGHT_SCALE(gameRecord.getWeightScale());
                applicationDetails.setvTIME_EVENT(gameRecord.getTimeEvent());
                applicationDetails.setvPLACE_EVENT(gameRecord.getPlaceEvent());
                applicationDetails.setvTELEPHONE_EVENT(gameRecord.getTelephoneEvent());
                applicationDetails.setvAMBULANCE(gameRecord.getAmbulance());
                applicationDetails.setvHOSPITAL_NEARBY(gameRecord.getHospitalNearby());
                applicationDetails.setvDATE_START(gameRecord.getDateStart());
                applicationDetails.setvDATE_END(gameRecord.getDateEnd());
                applicationDetails.setvEVENT(gameRecord.getEvent());
                applicationDetails.setvPERMIT_NUMBER(gameRecord.getPermitNumber());
                applicationDetails.setvAPPLICATION_FOR(gameRecord.getApplicationFor());
                applicationDetails.setvGYM(gameRecord.getGym());
                applicationDetails.setvDATE_APPLIED(gameRecord.getDateApplied());
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
                applicationDetails.setvDATE_CONTEST(gameRecord.getDateContest());
                applicationDetails.setvFIGHT_RECORDS(gameRecord.getFightRecords());
                applicationDetails.setvCONTEST_PLACE(gameRecord.getContestPlace());

                applicationDetails.setvAPPLICATION_TYPE(""+applicant.getApptype());
                applicationDetails.setvSTATUS(applicant.getStatus());
                applicationDetails.setvFIRST_NAME(applicant.getFirstName());
                applicationDetails.setvLAST_NAME(applicant.getLastName());
                applicationDetails.setvMIDDLE_NAME(applicant.getMiddleName());
                applicationDetails.setvNICK_NAME(applicant.getNickName());
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
            }
            else{
                log.error("Can't find previous license application!");
            }

        }catch(Exception e){
            log.error("Can't find previous license application!", e);
        }
        return applicationDetails;
    }
}
