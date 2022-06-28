package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapApplicantAddress;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PapApplicantAddressRepo extends JpaRepository<PapApplicantAddress,Integer> {

    @Transactional
    @Modifying
    @Query(value="DELETE FROM pap_applicant_address where applicant_id = :id", nativeQuery = true)
    void deleteByApplicantId(int id);

    @Query(value="SELECT * FROM pap_applicant_address ad WHERE ad.applicant_id = :applicantId", nativeQuery = true)
    List<PapApplicantAddress> findByApplicantId(int applicantId);
}
