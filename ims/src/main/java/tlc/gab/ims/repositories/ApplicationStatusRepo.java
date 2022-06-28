package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.ApplicationStatus;

@Repository
public interface ApplicationStatusRepo extends JpaRepository<ApplicationStatus, Integer> {

    @Query(value = "SELECT * FROM application_status where CODE = :code", nativeQuery = true)
    ApplicationStatus findByCode(String code);
}
