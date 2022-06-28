package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantRef;

@Repository
public interface GabApplicantRefRepo extends JpaRepository<GabApplicantRef, Integer> {

    @Query(value = "SELECT * FROM gab_applicant_ref WHERE ACCOUNT_ID = :applicantId", nativeQuery = true)
    GabApplicantRef findByAccountId(String applicantId);
}
