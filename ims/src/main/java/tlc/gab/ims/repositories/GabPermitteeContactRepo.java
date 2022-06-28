package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicenseeContact;
import tlc.gab.ims.entities.GabPermitteeContact;

import java.util.List;

@Repository
public interface GabPermitteeContactRepo extends JpaRepository<GabPermitteeContact, Integer>{

    @Query(value = "SELECT * FROM gab_permittee_contact WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabPermitteeContact> findByAccountId(String accountId);
}
