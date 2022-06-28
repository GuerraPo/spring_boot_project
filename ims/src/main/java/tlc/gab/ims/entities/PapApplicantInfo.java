package tlc.gab.ims.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "pap_applicant_info")
public class PapApplicantInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int applicantId;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "MIDDLE_NAME")
    private String middleName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "NICK_NAME")
    private String nickName;

    @Column(name = "BIRTH_DATE")
    private String birthDate;

    @Column(name = "BIRTH_PLACE")
    private String birthPlace;

    @Column(name = "AGE")
    private String age;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "HEIGHT")
    private String height;

    @Column(name = "WEIGHT")
    private String weight;

    @Column(name = "HAIR_COLOR")
    private String hairColor;

    @Column(name = "EYE_COLOR")
    private String eyeColor;

    @Column(name = "CITIZENSHIP")
    private String citizenship;

    @Column(name = "CIVILSTATUS")
    private String civilStatus;

    @Column(name = "SSS")
    private String sss;

    @Column(name = "EDUCATIONAL_BACKGROUND")
    private String educationalBackground;

    @Column(name = "ACCUSED_CRIME")
    private String accusedCrime;

    @Column(name = "STATE_OFFENSE")
    private String stateOffense;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "OFFICE")
    private String office;

    @Column(name = "CREATED_BY")
    private String createdBy;

    @Column(name = "CREATED_DATETIME")
    private String createdDateTime;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATETIME")
    private String modifiedDateTime;

    @Column(name = "SUFFIX")
    private String suffix;

    @OneToMany(targetEntity = PapApplicantContact.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "APPLICANT_ID", referencedColumnName = "ID")
    private List<PapApplicantContact> contacts;

    @OneToOne(mappedBy = "applicantInfo", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private PapUser userAccount;

    @OneToMany(targetEntity = PapApplicantAddress.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "APPLICANT_ID", referencedColumnName = "ID")
    private List<PapApplicantAddress> address;

    public int getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(int applicantId) {
        this.applicantId = applicantId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public String getEyeColor() {
        return eyeColor;
    }

    public void setEyeColor(String eyeColor) {
        this.eyeColor = eyeColor;
    }

    public String getCitizenship() {
        return citizenship;
    }

    public void setCitizenship(String citizenship) {
        this.citizenship = citizenship;
    }

    public String getCivilStatus() {
        return civilStatus;
    }

    public void setCivilStatus(String civilStatus) {
        this.civilStatus = civilStatus;
    }

    public String getSss() {
        return sss;
    }

    public void setSss(String sss) {
        this.sss = sss;
    }

    public String getEducationalBackground() {
        return educationalBackground;
    }

    public void setEducationalBackground(String educationalBackground) {
        this.educationalBackground = educationalBackground;
    }

    public String getAccusedCrime() {
        return accusedCrime;
    }

    public void setAccusedCrime(String accusedCrime) {
        this.accusedCrime = accusedCrime;
    }

    public String getStateOffense() {
        return stateOffense;
    }

    public void setStateOffense(String stateOffense) {
        this.stateOffense = stateOffense;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
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

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public List<PapApplicantContact> getContacts() {
        return contacts;
    }

    public void setContacts(List<PapApplicantContact> contacts) {
        this.contacts = contacts;
    }

    public PapUser getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(PapUser userAccount) {
        this.userAccount = userAccount;
    }

    public List<PapApplicantAddress> getAddress() {
        return address;
    }

    public void setAddress(List<PapApplicantAddress> address) {
        this.address = address;
    }
}
