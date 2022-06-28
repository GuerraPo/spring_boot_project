package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabLicenseeGameRecord;
import tlc.gab.ims.entities.GabPermitteeGameRecord;

@Repository
public interface GabPermitteeGameRecordRepo extends JpaRepository<GabPermitteeGameRecord,Integer> {

    @Query(value="SELECT * FROM gab_permittee_game_record WHERE PERMIT_NUMBER = :permitNumber AND CREATED_BY = :username", nativeQuery = true)
    GabPermitteeGameRecord searchByPermitNumber(String permitNumber, String username);
}
