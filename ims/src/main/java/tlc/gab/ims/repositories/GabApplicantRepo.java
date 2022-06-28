package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicant;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface GabApplicantRepo extends JpaRepository<GabApplicant, Integer> {

    //Basic queries--------------------------
    @Query(value = "SELECT * FROM gab_applicant WHERE CREATED_BY = :username", nativeQuery = true)
    List<GabApplicant> findByCreatedBy(String username);

    @Query(value = "SELECT * FROM gab_applicant WHERE CREATED_BY = :username ORDER BY ACCOUNT_ID DESC", nativeQuery = true)
    List<GabApplicant> getApplications(String username);

    @Query(value = "SELECT * FROM gab_applicant WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    GabApplicant findByAccountId(String accountId);

    @Query(value = "SELECT * FROM gab_applicant WHERE CREATED_BY = :username AND CREATED_DATETIME LIKE %:date% AND APP_TYPE = :appType ORDER BY ACCOUNT_ID DESC", nativeQuery = true)
    List<GabApplicant> getFilteredApplications(String username, String date, int appType);

    @Query(value = "SELECT * FROM gab_applicant WHERE CREATED_BY = :username AND CREATED_DATETIME LIKE %:date% ORDER BY ACCOUNT_ID DESC", nativeQuery = true)
    List<GabApplicant> getApplicationsByDate(String username, String date);

    //Functions/Store procedures------------------------------
    @Query(value = "SELECT `generateId`(:tbl)",nativeQuery = true)
    String generateId(String tbl);
}
