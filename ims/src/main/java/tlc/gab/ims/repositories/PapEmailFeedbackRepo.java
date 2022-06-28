package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapEmailFeedback;

@Repository
public interface PapEmailFeedbackRepo extends JpaRepository<PapEmailFeedback, Integer> {

    @Query(value = "SELECT e.* FROM pap_email_feedback e where e.feedback_id = :id",nativeQuery = true)
    PapEmailFeedback findByFeedbackId(int id);
}
