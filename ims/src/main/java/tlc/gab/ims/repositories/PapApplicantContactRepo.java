package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapApplicantContact;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PapApplicantContactRepo extends JpaRepository<PapApplicantContact,Integer> {

    @Transactional
    @Modifying
    @Query(value="DELETE FROM pap_applicant_contact where applicant_id = :id", nativeQuery = true)
    void deleteByApplicantId(int id);

    @Query(value="SELECT * FROM pap_applicant_contact ac WHERE ac.applicant_id = :applicantId", nativeQuery = true)
    List<PapApplicantContact> findByApplicantId(int applicantId);
}
