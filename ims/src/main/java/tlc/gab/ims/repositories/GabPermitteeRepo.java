package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicensee;
import tlc.gab.ims.entities.GabPermittee;

@Repository
public interface GabPermitteeRepo extends JpaRepository<GabPermittee, Integer> {

    @Query(value = "SELECT * FROM gab_permittee WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    GabPermittee findByAccountId(String accountId);
}
