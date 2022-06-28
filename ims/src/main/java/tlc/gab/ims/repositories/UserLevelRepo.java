package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tlc.gab.ims.entities.MedicalLaboratories;
import tlc.gab.ims.entities.WebUserLevel;

@Repository
public interface UserLevelRepo extends JpaRepository<WebUserLevel, Integer> {
}
