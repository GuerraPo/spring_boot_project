package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name = "gab_licensee_game_record")
public class GabPermitteeGameRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    @Column(name="SPORTS")
    private String sports;

    @Column(name = "ROLE")
    private String role;

    @Column(name = "LICENSE_NUMBER")
    private String licenseNumber;

    @Column(name = "CLUB")
    private String club;

    @Column(name = "RING_NAME")
    private String ringName;

    @Column(name = "PROMOTION_CONTRACT")
    private String promotionContract;

    @Column(name = "GAB_DENIED")
    private String gabDenied;

    @Column(name = "MANAGER_FIRST_NAME")
    private String managerFirstName;

    @Column(name = "MANAGER_MIDDLE_NAME")
    private String managerMiddleName;

    @Column(name = "MANAGER_LAST_NAME")
    private String managerLastName;

    @Column(name = "MANAGER_NICK_NAME")
    private String managerNickName;

    @Column(name = "TRAINING")
    private String training;

    @Column(name = "ROUNDER")
    private String rounder;

    @Column(name = "FIGHT_RECORD")
    private String fightRecord;

    @Column(name = "AMATEUR_RECORD")
    private String amateurRecord;

    @Column(name = "PROFESSIONAL_PERIOD")
    private String professionalPeriod;

    @Column(name = "APPLICANT_DATE")
    private String applicantDate;

    @Column(name = "LOCATION")
    private String location;

    @Column(name = "DATE_EVENT")
    private String dateEvent;

    @Column(name = "PROCLAMATION")
    private String proclamation;

    @Column(name = "BENIFICIARY")
    private String benificiary;

    @Column(name = "REQUEST")
    private String request;

    @Column(name = "FOREIGN_PARTICIPANTS")
    private String foreignParticipants;

    @Column(name = "PROMOTER")
    private String promoter;

    @Column(name = "BOUTS")
    private String bouts;

    @Column(name = "TV_COVERAGE")
    private String tvCoverage;

    @Column(name = "TICKETS")
    private String tickets;

    @Column(name = "DATE_WEIGHT_IN")
    private String dateWeightIn;

    @Column(name = "TIME_WEIGHTIN")
    private String timeWeightIn;

    @Column(name = "PLACE_WEIGHT_IN")
    private String placeWeightIn;

    @Column(name = "WEIGHT_SCALE")
    private String weightScale;

    @Column(name = "TIME_EVENT")
    private String timeEvent;

    @Column(name = "PLACE_EVENT")
    private String placeEvent;

    @Column(name = "TELEPHONE_EVENT")
    private String telephoneEvent;

    @Column(name = "AMBULANCE")
    private String ambulance;

    @Column(name = "HOSPITAL_NEARBY")
    private String hospitalNearby;

    @Column(name = "DATE_START")
    private String dateStart;

    @Column(name = "DATE_END")
    private String dateEnd;

    @Column(name = "EVENT")
    private String event;

    @Column(name = "PERMIT_NUMBER")
    private String permitNumber;

    @Column(name = "APPLICATION_FOR")
    private String applicationFor;

    @Column(name = "ACCOMPANY_FIRST_NAME")
    private String accompanyFirstName;

    @Column(name = "ACCOMPANY_MIDDLE_NAME")
    private String accompanyMiddleName;

    @Column(name = "ACCOMPANY_LAST_NAME")
    private String accompanyLastName;

    @Column(name = "ACCOMPANY_NICK_NAME")
    private String accompanyNickName;

    @Column(name = "GYM")
    private String gym;

    @Column(name = "DATE_APPLIED")
    private String dateApplied;

    @Column(name = "DATE_FIGHT")
    private String DATE_FIGHT;

    @Column(name = "PASSPORT_FIRST_NAME")
    private String passportFirstName;

    @Column(name = "PASSPORT_MIDDLE_NAME")
    private String passportMiddleName;

    @Column(name = "PASSPORT_LAST_NAME")
    private String passportLastName;

    @Column(name = "OPPONENT_FIRST_NAME")
    private String opponentFirstName;

    @Column(name = "OPPONENT_MIDDLE_NAME")
    private String opponentMiddleName;

    @Column(name = "OPPONENT_LAST_NAME")
    private String opponentLastName;

    @Column(name = "OPPONENT_NICK_NAME")
    private String opponentNickName;

    @Column(name = "TITLE_WEIGHT")
    private String titleWeight;

    @Column(name = "ROUNDS")
    private String rounds;

    @Column(name = "DATE_CONTEST")
    private String dateContest;

    @Column(name = "FIGHT_RECORDS")
    private String fightRecords;

    @Column(name = "CONTEST_PLACE")
    private String contestPlace;

//    @Column(name = "EXPIRATION_DATE")
//    private String expirationDate;

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

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getSports() {
        return sports;
    }

    public void setSports(String sports) {
        this.sports = sports;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }

    public String getRingName() {
        return ringName;
    }

    public void setRingName(String ringName) {
        this.ringName = ringName;
    }

    public String getPromotionContract() {
        return promotionContract;
    }

    public void setPromotionContract(String promotionContract) {
        this.promotionContract = promotionContract;
    }

    public String getGabDenied() {
        return gabDenied;
    }

    public void setGabDenied(String gabDenied) {
        this.gabDenied = gabDenied;
    }

    public String getManagerFirstName() {
        return managerFirstName;
    }

    public void setManagerFirstName(String managerFirstName) {
        this.managerFirstName = managerFirstName;
    }

    public String getManagerMiddleName() {
        return managerMiddleName;
    }

    public void setManagerMiddleName(String managerMiddleName) {
        this.managerMiddleName = managerMiddleName;
    }

    public String getManagerLastName() {
        return managerLastName;
    }

    public void setManagerLastName(String managerLastName) {
        this.managerLastName = managerLastName;
    }

    public String getManagerNickName() {
        return managerNickName;
    }

    public void setManagerNickName(String managerNickName) {
        this.managerNickName = managerNickName;
    }

    public String getTraining() {
        return training;
    }

    public void setTraining(String training) {
        this.training = training;
    }

    public String getRounder() {
        return rounder;
    }

    public void setRounder(String rounder) {
        this.rounder = rounder;
    }

    public String getFightRecord() {
        return fightRecord;
    }

    public void setFightRecord(String fightRecord) {
        this.fightRecord = fightRecord;
    }

    public String getAmateurRecord() {
        return amateurRecord;
    }

    public void setAmateurRecord(String amateurRecord) {
        this.amateurRecord = amateurRecord;
    }

    public String getProfessionalPeriod() {
        return professionalPeriod;
    }

    public void setProfessionalPeriod(String professionalPeriod) {
        this.professionalPeriod = professionalPeriod;
    }

    public String getApplicantDate() {
        return applicantDate;
    }

    public void setApplicantDate(String applicantDate) {
        this.applicantDate = applicantDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDateEvent() {
        return dateEvent;
    }

    public void setDateEvent(String dateEvent) {
        this.dateEvent = dateEvent;
    }

    public String getProclamation() {
        return proclamation;
    }

    public void setProclamation(String proclamation) {
        this.proclamation = proclamation;
    }

    public String getBenificiary() {
        return benificiary;
    }

    public void setBenificiary(String benificiary) {
        this.benificiary = benificiary;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getForeignParticipants() {
        return foreignParticipants;
    }

    public void setForeignParticipants(String foreignParticipants) {
        this.foreignParticipants = foreignParticipants;
    }

    public String getPromoter() {
        return promoter;
    }

    public void setPromoter(String promoter) {
        this.promoter = promoter;
    }

    public String getBouts() {
        return bouts;
    }

    public void setBouts(String bouts) {
        this.bouts = bouts;
    }

    public String getTvCoverage() {
        return tvCoverage;
    }

    public void setTvCoverage(String tvCoverage) {
        this.tvCoverage = tvCoverage;
    }

    public String getTickets() {
        return tickets;
    }

    public void setTickets(String tickets) {
        this.tickets = tickets;
    }

    public String getDateWeightIn() {
        return dateWeightIn;
    }

    public void setDateWeightIn(String dateWeightIn) {
        this.dateWeightIn = dateWeightIn;
    }

    public String getTimeWeightIn() {
        return timeWeightIn;
    }

    public void setTimeWeightIn(String timeWeightIn) {
        this.timeWeightIn = timeWeightIn;
    }

    public String getPlaceWeightIn() {
        return placeWeightIn;
    }

    public void setPlaceWeightIn(String placeWeightIn) {
        this.placeWeightIn = placeWeightIn;
    }

    public String getWeightScale() {
        return weightScale;
    }

    public void setWeightScale(String weightScale) {
        this.weightScale = weightScale;
    }

    public String getTimeEvent() {
        return timeEvent;
    }

    public void setTimeEvent(String timeEvent) {
        this.timeEvent = timeEvent;
    }

    public String getPlaceEvent() {
        return placeEvent;
    }

    public void setPlaceEvent(String placeEvent) {
        this.placeEvent = placeEvent;
    }

    public String getTelephoneEvent() {
        return telephoneEvent;
    }

    public void setTelephoneEvent(String telephoneEvent) {
        this.telephoneEvent = telephoneEvent;
    }

    public String getAmbulance() {
        return ambulance;
    }

    public void setAmbulance(String ambulance) {
        this.ambulance = ambulance;
    }

    public String getHospitalNearby() {
        return hospitalNearby;
    }

    public void setHospitalNearby(String hospitalNearby) {
        this.hospitalNearby = hospitalNearby;
    }

    public String getDateStart() {
        return dateStart;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getPermitNumber() {
        return permitNumber;
    }

    public void setPermitNumber(String permitNumber) {
        this.permitNumber = permitNumber;
    }

    public String getApplicationFor() {
        return applicationFor;
    }

    public void setApplicationFor(String applicationFor) {
        this.applicationFor = applicationFor;
    }

    public String getAccompanyFirstName() {
        return accompanyFirstName;
    }

    public void setAccompanyFirstName(String accompanyFirstName) {
        this.accompanyFirstName = accompanyFirstName;
    }

    public String getAccompanyMiddleName() {
        return accompanyMiddleName;
    }

    public void setAccompanyMiddleName(String accompanyMiddleName) {
        this.accompanyMiddleName = accompanyMiddleName;
    }

    public String getAccompanyLastName() {
        return accompanyLastName;
    }

    public void setAccompanyLastName(String accompanyLastName) {
        this.accompanyLastName = accompanyLastName;
    }

    public String getAccompanyNickName() {
        return accompanyNickName;
    }

    public void setAccompanyNickName(String accompanyNickName) {
        this.accompanyNickName = accompanyNickName;
    }

    public String getGym() {
        return gym;
    }

    public void setGym(String gym) {
        this.gym = gym;
    }

    public String getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(String dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getDATE_FIGHT() {
        return DATE_FIGHT;
    }

    public void setDATE_FIGHT(String DATE_FIGHT) {
        this.DATE_FIGHT = DATE_FIGHT;
    }

    public String getPassportFirstName() {
        return passportFirstName;
    }

    public void setPassportFirstName(String passportFirstName) {
        this.passportFirstName = passportFirstName;
    }

    public String getPassportMiddleName() {
        return passportMiddleName;
    }

    public void setPassportMiddleName(String passportMiddleName) {
        this.passportMiddleName = passportMiddleName;
    }

    public String getPassportLastName() {
        return passportLastName;
    }

    public void setPassportLastName(String passportLastName) {
        this.passportLastName = passportLastName;
    }

    public String getOpponentFirstName() {
        return opponentFirstName;
    }

    public void setOpponentFirstName(String opponentFirstName) {
        this.opponentFirstName = opponentFirstName;
    }

    public String getOpponentMiddleName() {
        return opponentMiddleName;
    }

    public void setOpponentMiddleName(String opponentMiddleName) {
        this.opponentMiddleName = opponentMiddleName;
    }

    public String getOpponentLastName() {
        return opponentLastName;
    }

    public void setOpponentLastName(String opponentLastName) {
        this.opponentLastName = opponentLastName;
    }

    public String getOpponentNickName() {
        return opponentNickName;
    }

    public void setOpponentNickName(String opponentNickName) {
        this.opponentNickName = opponentNickName;
    }

    public String getTitleWeight() {
        return titleWeight;
    }

    public void setTitleWeight(String titleWeight) {
        this.titleWeight = titleWeight;
    }

    public String getRounds() {
        return rounds;
    }

    public void setRounds(String rounds) {
        this.rounds = rounds;
    }

    public String getDateContest() {
        return dateContest;
    }

    public void setDateContest(String dateContest) {
        this.dateContest = dateContest;
    }

    public String getFightRecords() {
        return fightRecords;
    }

    public void setFightRecords(String fightRecords) {
        this.fightRecords = fightRecords;
    }

    public String getContestPlace() {
        return contestPlace;
    }

    public void setContestPlace(String contestPlace) {
        this.contestPlace = contestPlace;
    }

//    public String getExpirationDate() {
//        return expirationDate;
//    }
//
//    public void setExpirationDate(String expirationDate) {
//        this.expirationDate = expirationDate;
//    }

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
