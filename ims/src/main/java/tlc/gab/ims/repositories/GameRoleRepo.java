package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GameRole;

import java.util.List;

@Repository
public interface GameRoleRepo extends JpaRepository<GameRole, Integer> {

    @Query(value = "SELECT * FROM game_role WHERE game = :code AND STATUS = 'ACTIVE' ORDER BY name ASC",nativeQuery = true)
    List<GameRole> findByCode(String code);

    @Query(value = "SELECT * FROM game_role WHERE code = :code AND STATUS = 'ACTIVE'",nativeQuery = true)
    GameRole findOneByCode(String code);

    @Query(value = "SELECT GR.* FROM game_role GR WHERE GR.CODE IN (SELECT WF.game_role FROM workflow_for WF WHERE WF.workflow IN (SELECT CODE FROM workflow WHERE TRANSTYPE = :appType))", nativeQuery = true)
    List<GameRole> findByAppType(int appType);
}
