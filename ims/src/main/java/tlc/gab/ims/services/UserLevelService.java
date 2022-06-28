package tlc.gab.ims.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tlc.gab.ims.entities.WebUserLevel;
import tlc.gab.ims.repositories.UserLevelRepo;

@Service
public class UserLevelService {
	 Logger log = LoggerFactory.getLogger(UserLevelService.class);
	
	@Autowired
	private UserLevelRepo userLevelRepo;
	
	public ResponseEntity<?> addUserLevel(WebUserLevel webUserLevel) {
		ResponseEntity res = new ResponseEntity<>("Error in adding new userlevel!", HttpStatus.BAD_REQUEST);
        try{
        	userLevelRepo.save(webUserLevel);
            res = new ResponseEntity(webUserLevel, HttpStatus.OK);
        }catch(Exception e){
            log.error("",e);
        }
        return res;
	}

	public ResponseEntity<?> getUserLevels() {
		ResponseEntity res = new ResponseEntity<>("Error in getting the user level list!", HttpStatus.BAD_REQUEST);
        try{
           List<WebUserLevel> labs = userLevelRepo.findAll();
           res = new ResponseEntity(labs, HttpStatus.OK);
        }catch (Exception e){
            log.error("",e);
        }
        return res;
	}

}
