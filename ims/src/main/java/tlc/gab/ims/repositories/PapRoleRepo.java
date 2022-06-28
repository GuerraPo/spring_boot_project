package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapRole;

import java.util.List;

@Repository
public interface PapRoleRepo extends JpaRepository<PapRole, Integer> {

    @Query(value = "SELECT * FROM pap_role WHERE role_id NOT IN (1,2)", nativeQuery = true)
    List<PapRole> getUserRoles();
}
