package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantGameRecordLines;

@Repository
public interface GabApplicantGameRecordLinesRepo extends JpaRepository<GabApplicantGameRecordLines, String> {
}
