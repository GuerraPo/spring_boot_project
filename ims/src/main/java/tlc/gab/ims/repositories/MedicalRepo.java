package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.MedicalLaboratories;

@Repository
public interface MedicalRepo extends JpaRepository<MedicalLaboratories, Integer> {

    @Query(value = "SELECT * FROM pap_medical_laboratories WHERE id = :id", nativeQuery = true)
    MedicalLaboratories findLabById(int id);
}
