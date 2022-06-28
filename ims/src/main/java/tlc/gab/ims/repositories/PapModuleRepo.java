package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapModule;

import java.util.List;

@Repository
public interface PapModuleRepo extends JpaRepository<PapModule, Integer> {

    @Query(value = "SELECT pm.* FROM pap_module pm WHERE pm.id IN(\n" +
            "\tSELECT prmc.module_id FROM pap_role_module_config prmc WHERE\n" +
            "\tprmc.role_id = (SELECT pr.role_id FROM pap_role pr WHERE pr.role_name = :role)\n" +
            "); ", nativeQuery = true)
    List<PapModule> finByRole(String role);
}
