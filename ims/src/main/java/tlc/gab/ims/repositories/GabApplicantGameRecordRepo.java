package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantGameRecord;

@Repository
public interface GabApplicantGameRecordRepo extends JpaRepository<GabApplicantGameRecord, Integer> {

    @Query(value = "SELECT * FROM gab_applicant_game_record WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    GabApplicantGameRecord findByAccountId(String accountId);
}
