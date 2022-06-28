package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicensee;

@Repository
public interface GabLicenseeRepo extends JpaRepository<GabLicensee, Integer> {

    @Query(value = "SELECT * FROM gab_licensee WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    GabLicensee findByAccountId(String accountId);
}
