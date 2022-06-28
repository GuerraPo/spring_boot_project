package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.ReprintIDList;

@Repository
public interface ReprintIDListRepo extends JpaRepository<ReprintIDList, Integer> {

    @Query(value = "SELECT * FROM gab_reprint_id_list WHERE account_id = :applicantId", nativeQuery = true)
    ReprintIDList findByAccountId(String applicantId);
}
