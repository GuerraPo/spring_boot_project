package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicenseeGameRecord;

@Repository
public interface GabLicenseeGameRecordRepo extends JpaRepository<GabLicenseeGameRecord,Integer> {

    @Query(value="SELECT * FROM gab_licensee_game_record WHERE LICENSE_NUMBER = :licenseNumber AND CREATED_BY = :name", nativeQuery = true)
    GabLicenseeGameRecord searchByLicenseNumber(String licenseNumber, String name);
}
