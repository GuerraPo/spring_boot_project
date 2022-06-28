package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.ApplicationType;

import java.util.List;

@Repository
public interface ApplicationTypeRepo extends JpaRepository<ApplicationType, Integer> {

    @Query(value = "SELECT * FROM application_type WHERE TYPE_CODE = 'P' AND ID IN (" +
            "SELECT TRANSTYPE FROM workflow WHERE DIVISION = :division)",nativeQuery = true)
    List<ApplicationType> getPermitTypesByDivision(String division);
}
