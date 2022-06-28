package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicenseeAddress;
import tlc.gab.ims.entities.GabPermitteeAddress;

import java.util.List;

@Repository
public interface GabPermitteeAddressRepo extends JpaRepository<GabPermitteeAddress, Integer> {

    @Query(value = "SELECT * FROM gab_permittee_address WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabPermitteeAddress> findByAccountId(String accountId);
}
