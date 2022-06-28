package tlc.gab.ims.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import tlc.gab.ims.entities.GabApplicant;
import tlc.gab.ims.entities.PapApplicantInfo;
import tlc.gab.ims.entities.PapUser;
import tlc.gab.ims.repositories.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Configuration
@EnableScheduling
public class DeleteInactiveApplicantUtil {

    Logger log = LoggerFactory.getLogger(DeleteInactiveApplicantUtil.class);

    @Autowired
    PapApplicantInfoRepo infoRepo;

	@Autowired
	PapApplicantAddressRepo addressRepo;

	@Autowired
	PapApplicantContactRepo contactRepo;

	@Autowired
	PapUserRepo userRepo;

	@Autowired
	GabApplicantRepo appRepo;

	GeneralUtil genUtil = new GeneralUtil();

	// will run every 12 midnight....
	@Scheduled(cron = "0 0 0 *  *  *")
	void deleteInactiveAccounts(){
		try{
			List<PapApplicantInfo> allApplicants = infoRepo.findAll();
			for(PapApplicantInfo info : allApplicants){

				int id = info.getApplicantId();

				PapUser userAccount = userRepo.findByApplicantId(id+"");

				DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

				String currDate = genUtil.getCurrentDateTime();
				LocalDateTime currentDate = LocalDateTime.parse(currDate,dtf);

				String dateCreated = info.getCreatedDateTime();
				LocalDateTime createdDate =  LocalDateTime.parse(dateCreated,dtf);

				Long days = ChronoUnit.DAYS.between(createdDate, currentDate);

				List<GabApplicant> applications = appRepo.findByCreatedBy(userAccount.getUsername());

				log.info("Checking activity of applicant "+info.getApplicantId());

				if(days>=15 && applications.size()==0) { // Set conditions for days and applicant inactivity

					//deleting child tables for applicants
					userRepo.deleteByApplicantId(id);
					contactRepo.deleteByApplicantId(id);
					addressRepo.deleteByApplicantId(id);
					log.info("An applicant w/ applicant_id: " + id + "was deleted!");
				}
			}
			log.info("The CRON job was termnated!");
		}catch(Exception e){
			log.info("error",e);
		}
	}
}
