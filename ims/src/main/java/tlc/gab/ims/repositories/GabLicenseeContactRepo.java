package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicenseeContact;

import java.util.List;

@Repository
public interface GabLicenseeContactRepo extends JpaRepository<GabLicenseeContact, Integer>{

    @Query(value = "SELECT * FROM gab_licensee_contact WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabLicenseeContact> findByAccountId(String accountId);
}
