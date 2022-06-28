package tlc.gab.ims.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "pap_medical_laboratories")
public class MedicalLaboratories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "laboratory_name")
    private String laboratoryName;

    @Column(name = "location")
    private String location;

    @Column(name = "email")
    @Email
    private String email;

    @Column(name = "mobile_number")
    private String mobileNum;

    @Column(name = "telephone_number")
    private String telephoneNum;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLaboratoryName() {
        return laboratoryName;
    }

    public void setLaboratoryName(String laboratoryName) {
        this.laboratoryName = laboratoryName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNum() {
        return mobileNum;
    }

    public void setMobileNum(String mobileNum) {
        this.mobileNum = mobileNum;
    }

    public String getTelephoneNum() {
        return telephoneNum;
    }

    public void setTelephoneNum(String telephoneNum) {
        this.telephoneNum = telephoneNum;
    }
}
