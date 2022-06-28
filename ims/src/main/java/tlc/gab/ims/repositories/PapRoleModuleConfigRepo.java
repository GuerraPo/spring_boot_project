package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapRoleModuleConfig;

@Repository
public interface PapRoleModuleConfigRepo extends JpaRepository<PapRoleModuleConfig, Integer> {
}
