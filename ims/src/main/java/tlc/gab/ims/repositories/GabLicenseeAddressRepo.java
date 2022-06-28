package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicenseeAddress;

import java.util.List;

@Repository
public interface GabLicenseeAddressRepo extends JpaRepository<GabLicenseeAddress, Integer> {

    @Query(value = "SELECT * FROM gab_licensee_address WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabLicenseeAddress> findByAccountId(String accountId);
}
