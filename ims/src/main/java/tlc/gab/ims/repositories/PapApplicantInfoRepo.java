package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapApplicantInfo;

import java.util.List;

@Repository
public interface PapApplicantInfoRepo extends JpaRepository<PapApplicantInfo,Integer> {

    @Query(value="SELECT i.* FROM pap_applicant_info i WHERE i.created_datetime LIKE :datetime",nativeQuery = true)
    List<PapApplicantInfo> getInactiveApplicants(String datetime);
}