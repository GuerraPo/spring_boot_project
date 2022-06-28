package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.WorkFlowLines;

@Repository
public interface WorkflowLinesRepo extends JpaRepository<WorkFlowLines, Integer>{

    @Query(value = "SELECT STATUS FROM workflow_lines WHERE CODE = :workflow AND SEQUENCE = :sequence", nativeQuery = true)
    String findByCode(String workflow, String sequence);
}
