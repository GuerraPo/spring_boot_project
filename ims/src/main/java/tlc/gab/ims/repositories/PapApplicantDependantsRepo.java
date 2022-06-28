package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapApplicantDependants;

@Repository
public interface PapApplicantDependantsRepo extends JpaRepository<PapApplicantDependants,Integer> {
}
