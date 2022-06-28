package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.PapUser;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PapUserRepo extends JpaRepository<PapUser, Integer> {

    @Query(value = "SELECT * from pap_user where email = :email", nativeQuery = true)
    PapUser findByEmail(String email);

    @Query(value = "SELECT * from pap_user where username = :username", nativeQuery = true)
    PapUser findByUsername(String username);

    @Query(value = "SELECT * from pap_user where applicant_id = :applicantId", nativeQuery = true)
    PapUser findByApplicantId(String applicantId);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM pap_user where applicant_id = :id", nativeQuery = true)
    void deleteByApplicantId(int id);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM pap_user_role where user_id = :id and role_id != '2'", nativeQuery = true)
    void deleteUserRoleByApplicantId(int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE pap_user SET password = :password WHERE email = :email", nativeQuery = true)
    void updatePassword(String email, String password);

    @Query(value = "SELECT * FROM pap_user pu WHERE pu.id IN(\n" +
            "\tSELECT pur.user_id FROM pap_user_role pur WHERE pur.role_id IN(\n" +
            "\t\tSELECT pr.role_id FROM pap_role pr WHERE role_name NOT IN(\n" +
            "\t\t\t\"APPLICANT\", \"SUPERADMIN\"\n" +
            "\t\t)\n" +
            "\t)\n" +
            ")",nativeQuery = true)
    List<PapUser> getUsersForAdmin();

    @Query(value = "SELECT * FROM pap_user WHERE verification_code = :code", nativeQuery = true)
    public PapUser findByVerificationCode(String code);
}
