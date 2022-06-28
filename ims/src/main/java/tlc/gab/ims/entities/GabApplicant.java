package tlc.gab.ims.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="gab_applicant")
public class GabApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "MIDDLE_NAME")
    private String middleName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "NICK_NAME")
    private String nickName = " ";

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
    private String color;

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

    @Column(name = "APP_TYPE")
    private int apptype;

    @Column(name = "OFFICE")
    private String office;

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

    @Column(name = "SUFFIX")
    private String suffix;

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
        this.accountId = checkStringIfNull(accountId);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = checkStringIfNull(firstName);
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = checkStringIfNull(middleName);
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = checkStringIfNull(lastName);
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = checkStringIfNull(nickName);
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = checkStringDateIfNull(birthDate);
    }

    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace =  checkStringIfNull(birthPlace);
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age =  checkStringIfNull(age);
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender =  checkStringIfNull(gender);
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = checkStringIfNull(height);
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = checkStringIfNull(weight);
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = checkStringIfNull(color);
    }

    public String getEyeColor() {
        return eyeColor;
    }

    public void setEyeColor(String eyeColor) {
        this.eyeColor = checkStringIfNull(eyeColor);
    }

    public String getCitizenship() {
        return citizenship;
    }

    public void setCitizenship(String citizenship) {
        this.citizenship = checkStringIfNull(citizenship);
    }

    public String getCivilStatus() {
        return civilStatus;
    }

    public void setCivilStatus(String civilStatus) {
        this.civilStatus = checkStringIfNull(civilStatus);
    }

    public String getSss() {
        return sss;
    }

    public void setSss(String sss) {
        this.sss = checkStringIfNull(sss);
    }

    public String getEducationalBackground() {
        return educationalBackground;
    }

    public void setEducationalBackground(String educationalBackground) {
        this.educationalBackground = checkStringIfNull(educationalBackground);
    }

    public String getAccusedCrime() {
        return accusedCrime;
    }

    public void setAccusedCrime(String accusedCrime) {
        if(accusedCrime == null){
            accusedCrime = "NO";
        }
        this.accusedCrime = accusedCrime;
    }

    public String getStateOffense() {
        return stateOffense;
    }

    public void setStateOffense(String stateOffense) {
        this.stateOffense = checkStringIfNull(stateOffense);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = checkStringIfNull(status);
    }

    public int getApptype() {
        return apptype;
    }

    public void setApptype(int apptype) {
        this.apptype = apptype;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = checkStringIfNull(office);
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = checkStringIfNull(createdBy);
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
        this.modifiedBy = checkStringIfNull(modifiedBy);
    }

    public LocalDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(LocalDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = checkStringIfNull(suffix);
    }

    private String checkStringIfNull(String var){
        String val = "";
        if(var!=null){
            val = var;
        }
        return val;
    }

    private String checkStringDateIfNull(String var){
        String val = "0000-00-00";
        if(var!=null){
            val = var;
        }
        return val;
    }
}
