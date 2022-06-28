package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabApplicantRequirements;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface GabApplicantRequirementsRepo extends JpaRepository<GabApplicantRequirements, Integer> {

    @Query(value = "SELECT * FROM gab_applicant_requirements WHERE ACCOUNT_ID = :accountId AND REQUIREMENTS = :requirements", nativeQuery = true)
    GabApplicantRequirements checkIfExisting(String accountId, String requirements);

    @Query(value = "SELECT * FROM gab_applicant_requirements WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    List<GabApplicantRequirements> findByAccountId(String accountId);

    @Query(value = "SELECT * FROM gab_applicant_requirements WHERE ACCOUNT_ID = :accountId AND TYPE = 'DOCUMENTARY'", nativeQuery = true)
    List<GabApplicantRequirements> findUploadedDocumentaryRequirements(String accountId);

    @Query(value = "SELECT * FROM gab_applicant_requirements WHERE ACCOUNT_ID = :accountId AND TYPE = 'SIGNATORY' AND REQUIREMENTS = 'SIG'", nativeQuery = true)
    GabApplicantRequirements findUploadedSignatoryRequirements(String accountId);

    @Query(value = "SELECT CONCAT(DIR,'.',FILE_EXT) FROM gab_applicant_requirements WHERE ACCOUNT_ID = :accountId AND TYPE = 'DISPLAY_PHOTO'", nativeQuery = true)
    String getDisplayPhoto(String accountId);

    @Query(value = "SELECT DIR FROM gab_applicant_requirements WHERE ACCOUNT_ID = :account_id AND TYPE = 'DISPLAY_PHOTO'", nativeQuery = true)
    String getDisplayPhotoDir(String account_id);

    @Query(value = "SELECT FILE_EXT FROM gab_applicant_requirements WHERE ACCOUNT_ID = :account_id AND TYPE = 'DISPLAY_PHOTO'", nativeQuery = true)
    String getDisplayPhotoExt(String account_id);

    @Query(value = "SELECT DIR FROM gab_applicant_requirements WHERE ACCOUNT_ID = :account_id AND TYPE = 'SIGNATORY' AND REQUIREMENTS = 'SIG'", nativeQuery = true)
    String getSignatoryDir(String account_id);

    @Query(value = "SELECT FILE_EXT FROM gab_applicant_requirements WHERE ACCOUNT_ID = :account_id AND TYPE = 'SIGNATORY' AND REQUIREMENTS = 'SIG'", nativeQuery = true)
    String getSignatoryExt(String account_id);

    @Query(value = "SELECT * FROM gab_applicant_requirements WHERE ACCOUNT_ID = :accountId AND TYPE = 'DISPLAY_PHOTO'", nativeQuery = true)
    GabApplicantRequirements findUploadedDisplayPhotoRequirements(String accountId);

    @Query(value = "SELECT * FROM gab_applicant_requirements WHERE ACCOUNT_ID = :from AND REQUIREMENTS = :sig AND TYPE = :signatory", nativeQuery = true)
    GabApplicantRequirements getByAccountId(String from, String sig, String signatory);
}
