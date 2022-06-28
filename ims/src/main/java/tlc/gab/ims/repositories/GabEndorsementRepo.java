package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabEndorsement;

@Repository
public interface GabEndorsementRepo extends JpaRepository<GabEndorsement, Integer> {

    @Query(value = "call add_endorsement(:accountId,:sponsorFname,:sponsorMname,:sponsorLname,:sponsorNname,:visa,:embassy,:embassyAddress,:createdBy)", nativeQuery = true)
    void addEndorsement(String accountId, String sponsorFname, String sponsorMname, String sponsorLname, String sponsorNname, String visa, String embassy, String embassyAddress, String createdBy);
}
