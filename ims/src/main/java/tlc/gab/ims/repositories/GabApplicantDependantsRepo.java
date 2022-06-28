package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantDependants;

@Repository
public interface GabApplicantDependantsRepo extends JpaRepository<GabApplicantDependants, Integer> {

    @Query(value="SELECT * FROM gab_applicant_dependents WHERE ACCOUNT_ID = :accountId",nativeQuery = true)
    GabApplicantDependants findByAccountId(String accountId);
}
