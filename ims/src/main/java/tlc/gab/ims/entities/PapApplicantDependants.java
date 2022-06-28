package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name="pap_applicant_dependants")
public class PapApplicantDependants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DEPENDANT_ID")
    private int id;

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

    @Column(name = "CREATED_DATETIME")
    private String createdDateTime;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATETIME")
    private String modifiedDateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(String modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }
}
