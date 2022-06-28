package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantAddress;

import java.util.List;

@Repository
public interface GabApplicantAddressRepo extends JpaRepository<GabApplicantAddress, Integer> {

    @Query(value = "SELECT * FROM gab_applicant_address WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabApplicantAddress> findByAccountId(String accountId);

    @Query(value = "SELECT * FROM gab_applicant_address WHERE ACCOUNT_ID = :accountId AND TYPE = :type", nativeQuery = true)
    GabApplicantAddress findAddress(String accountId, int type);

    @Query(value = "SELECT ADDRESS FROM gab_applicant_address WHERE ACCOUNT_ID = :account_id AND TYPE = :type", nativeQuery = true)
    String getIDAddress(String account_id, int type);
}
