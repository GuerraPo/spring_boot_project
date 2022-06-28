package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantStatusRecords;

@Repository
public interface GabApplicantStatusRecordsRepo extends JpaRepository<GabApplicantStatusRecords, Integer> {

    @Query(value = "SELECT * FROM gab_applicant_status_records WHERE ACCOUNT_ID = :accountId",nativeQuery = true)
    GabApplicantStatusRecords findByAccountId(String accountId);

    @Query(value = "SELECT * FROM gab_applicant_status_records WHERE ACCOUNT_ID = :accountId and SEQUENCE = 1", nativeQuery = true)
    GabApplicantStatusRecords checkStatusRecordS(String accountId);
}
