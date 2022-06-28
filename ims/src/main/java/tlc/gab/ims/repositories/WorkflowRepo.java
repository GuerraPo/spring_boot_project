package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.Workflow;

import java.util.List;

@Repository
public interface WorkflowRepo extends JpaRepository<Workflow, Integer> {

    @Query(value = "SELECT CODE FROM workflow WHERE DIVISION = :division AND TRANSTYPE = :appType", nativeQuery = true)
    String findWorkflow(String division, int appType);

    @Query(value = "SELECT WF.workflow FROM workflow_for WF WHERE WF.workflow IN (SELECT WK.code from workflow WK WHERE WK.TRANSTYPE IN (" +
            "SELECT ID FROM application_type WHERE TYPE_CODE = :typeCode " +
            ") AND WK.DIVISION = :division) AND WF.game_role = :game_role",nativeQuery = true)
    String getWorkflowFor(String game_role, String division, String typeCode);

    @Query(value = "SELECT WF.CODE FROM workflow WF WHERE WF.TRANSTYPE IN(" +
            " SELECT APT.ID FROM application_type APT WHERE APT.TYPE_CODE = :typeCode" +
            ") AND WF.DIVISION= :division", nativeQuery = true)
    String getWorkflowForPermit(String division, String typeCode);

    @Query(value = "SELECT WF.* FROM workflow WF LEFT JOIN workflow_for FR ON FR.workflow = WF.CODE WHERE FR.game_role = :role AND WF.DIVISION = :division and WF.TRANSTYPE = :appType", nativeQuery = true)
    Workflow findWorkflowV2(String role, String division, int appType);

    @Query(value = "SELECT * FROM workflow WHERE CODE = :code", nativeQuery = true)
    Workflow findWorkflowV3(String code);

    @Query(value = "SELECT TYPE_CODE FROM application_type WHERE ID = :apptype", nativeQuery = true)
    String getTypeCode(int apptype);

}
