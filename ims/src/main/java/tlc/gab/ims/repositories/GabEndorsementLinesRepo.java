package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabEndorsementLines;

@Repository
public interface GabEndorsementLinesRepo extends JpaRepository<GabEndorsementLines, Integer> {

    @Query(value = "call add_endorsement_lines(:code,:eventName,:eventStart,:eventEnd,:eventLocation,:createdBy)", nativeQuery = true)
    void addEndorsementLine(String code, String eventName, String eventStart, String eventEnd, String eventLocation, String createdBy);
}
