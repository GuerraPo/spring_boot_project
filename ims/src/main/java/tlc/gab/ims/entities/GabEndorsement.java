package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name = "gab_endorsement")
public class GabEndorsement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "CODE")
    private String code;

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    @Column(name = "SPONSOR_FIRST_NAME")
    private String sponsorFirstName;

    @Column(name = "SPONSOR_MIDDLE_NAME")
    private String sponsorMiddleName;

    @Column(name = "SPONSOR_LAST_NAME")
    private String sponsorLastName;

    @Column(name = "SPONSOR_NICK_NAME")
    private String sponsorNickName;

    @Column(name = "VISA")
    private String visa;

    @Column(name = "EMBASSY")
    private String embassy;

    @Column(name = "EMBASSY_ADDRESS")
    private String embassyAddress;

    @Column(name = "FIGHT_STAT")
    private String fightStat;

    @Column(name = "PHIL_RATING")
    private String philRating;

    @Column(name = "LOE_NUMBER")
    private String loeNumber;

    @Column(name = "PASSPORT_STAT")
    private String passportStat;

    @Column(name = "DFA_NUMBER")
    private String dfaNumber;

    @Column(name = "CONSULAR")
    private String consular;

    @Column(name = "DEPARTMENT_OFFICE")
    private String departmentOffice;

    @Column(name = "COMMISSIONER")
    private String commissioner;

    @Column(name = "COMMISSIONER_ADDRESS")
    private String commissionerAddress;

    @Column(name = "CREATED_BY")
    private String createdBy;

    @Column(name = "CREATED_DATETIME", columnDefinition = "DATETIME default current_timestamp()")
    private String createdDateTime;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATETIME", columnDefinition = "DATETIME default current_timestamp()")
    private String modifiedTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getSponsorFirstName() {
        return sponsorFirstName;
    }

    public void setSponsorFirstName(String sponsorFirstName) {
        this.sponsorFirstName = sponsorFirstName;
    }

    public String getSponsorMiddleName() {
        return sponsorMiddleName;
    }

    public void setSponsorMiddleName(String sponsorMiddleName) {
        this.sponsorMiddleName = sponsorMiddleName;
    }

    public String getSponsorLastName() {
        return sponsorLastName;
    }

    public void setSponsorLastName(String sponsorLastName) {
        this.sponsorLastName = sponsorLastName;
    }

    public String getSponsorNickName() {
        return sponsorNickName;
    }

    public void setSponsorNickName(String sponsorNickName) {
        this.sponsorNickName = sponsorNickName;
    }

    public String getVisa() {
        return visa;
    }

    public void setVisa(String visa) {
        this.visa = visa;
    }

    public String getEmbassy() {
        return embassy;
    }

    public void setEmbassy(String embassy) {
        this.embassy = embassy;
    }

    public String getEmbassyAddress() {
        return embassyAddress;
    }

    public void setEmbassyAddress(String embassyAddress) {
        this.embassyAddress = embassyAddress;
    }

    public String getFightStat() {
        return fightStat;
    }

    public void setFightStat(String fightStat) {
        this.fightStat = fightStat;
    }

    public String getPhilRating() {
        return philRating;
    }

    public void setPhilRating(String philRating) {
        this.philRating = philRating;
    }

    public String getLoeNumber() {
        return loeNumber;
    }

    public void setLoeNumber(String loeNumber) {
        this.loeNumber = loeNumber;
    }

    public String getPassportStat() {
        return passportStat;
    }

    public void setPassportStat(String passportStat) {
        this.passportStat = passportStat;
    }

    public String getDfaNumber() {
        return dfaNumber;
    }

    public void setDfaNumber(String dfaNumber) {
        this.dfaNumber = dfaNumber;
    }

    public String getConsular() {
        return consular;
    }

    public void setConsular(String consular) {
        this.consular = consular;
    }

    public String getDepartmentOffice() {
        return departmentOffice;
    }

    public void setDepartmentOffice(String departmentOffice) {
        this.departmentOffice = departmentOffice;
    }

    public String getCommissioner() {
        return commissioner;
    }

    public void setCommissioner(String commissioner) {
        this.commissioner = commissioner;
    }

    public String getCommissionerAddress() {
        return commissionerAddress;
    }

    public void setCommissionerAddress(String commissionerAddress) {
        this.commissionerAddress = commissionerAddress;
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

    public String getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(String modifiedTime) {
        this.modifiedTime = modifiedTime;
    }
}
