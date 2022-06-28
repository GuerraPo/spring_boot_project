package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantAddressType;

@Repository
public interface GabApplicantAddressTypeRepo extends JpaRepository<GabApplicantAddressType, Integer> {

}
