package tlc.gab.ims.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.PapEmailFeedback;
import tlc.gab.ims.repositories.PapEmailFeedbackRepo;

@Service
public class PapEmailFeedbackService {

    @Autowired
    private PapEmailFeedbackRepo repo;

    public PapEmailFeedback getEmailContent(int id){
        return repo.findByFeedbackId(id);
    }
}
