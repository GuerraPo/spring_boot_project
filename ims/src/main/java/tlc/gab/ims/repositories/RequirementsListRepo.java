package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.RequirementsList;

import java.util.List;

@Repository
public interface RequirementsListRepo extends JpaRepository<RequirementsList, Integer> {

    @Query(value = "SELECT RL.* FROM requirements_list RL WHERE RL.CODE IN(\n" +
            "SELECT GRL.REQUIREMENTS FROM game_requirements_lines GRL\n" +
            "WHERE GRL.CODE IN(\n" +
            "SELECT GR.CODE FROM game_requirements GR WHERE\n" +
            "GR.ROLE = :role)\n" +
            "AND RL.TYPE = 'DOCUMENTARY'\n" +
            ")", nativeQuery = true)
    List<RequirementsList> findDocumentaryRequirements(String role);

    @Query(value = "SELECT RL.* FROM requirements_list RL WHERE RL.CODE IN(\n" +
            "SELECT GRL.REQUIREMENTS FROM game_requirements_lines GRL\n" +
            "WHERE GRL.CODE IN(\n" +
            "SELECT GR.CODE FROM game_requirements GR WHERE\n" +
            "GR.ROLE = :role)\n" +
            "AND RL.TYPE = 'MEDICAL'\n" +
            ")", nativeQuery = true)
    List<RequirementsList> findMedicalRequirements(String role);
}
