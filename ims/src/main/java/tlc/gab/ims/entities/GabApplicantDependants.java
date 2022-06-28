package tlc.gab.ims.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="gab_applicant_dependents")
public class GabApplicantDependants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    @Column(name = "PARENTS_FIRST_NAME")
    private String parentsFirstName;

    @Column(name = "PARENTS_MIDDLE_NAME")
    private String parentsMiddleName;

    @Column(name = "PARENTS_LAST_NAME")
    private String parentsLastName;

    @Column(name = "PARENTS_NICK_NAME")
    private String parentsNickName;

    @Column(name = "CREATED_BY")
    private String createdBy;

    @CreationTimestamp
    @Column(name = "CREATED_DATETIME")
    private LocalDateTime createdDateTime;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @UpdateTimestamp
    @Column(name = "MODIFIED_DATETIME")
    private LocalDateTime modifiedDateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getParentsFirstName() {
        return parentsFirstName;
    }

    public void setParentsFirstName(String parentsFirstName) {
        this.parentsFirstName = parentsFirstName;
    }

    public String getParentsMiddleName() {
        return parentsMiddleName;
    }

    public void setParentsMiddleName(String parentsMiddleName) {
        this.parentsMiddleName = parentsMiddleName;
    }

    public String getParentsLastName() {
        return parentsLastName;
    }

    public void setParentsLastName(String parentsLastName) {
        this.parentsLastName = parentsLastName;
    }

    public String getParentsNickName() {
        return parentsNickName;
    }

    public void setParentsNickName(String parentsNickName) {
        this.parentsNickName = parentsNickName;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public LocalDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(LocalDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }
}
