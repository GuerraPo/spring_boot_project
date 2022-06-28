package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantContact;

import java.util.List;

@Repository
public interface GabApplicantContactRepo extends JpaRepository<GabApplicantContact, Integer> {

    @Query(value = "SELECT * FROM gab_applicant_contact WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabApplicantContact> findByAccountId(String accountId);

    @Query(value = "SELECT * FROM gab_applicant_contact WHERE ACCOUNT_ID = :accountId and TYPE = :type", nativeQuery = true)
    GabApplicantContact findContact(String accountId, String type);
}
