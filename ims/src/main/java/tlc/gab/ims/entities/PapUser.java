package tlc.gab.ims.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "pap_user")
public class PapUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Email
    @Column(name = "EMAIL")
    private String email;

    @Column(name = "AVATAR")
    private String avatar;

    @NotNull
    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "DATE_CREATED")
    private String dateCreated;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "PAP_USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<PapRole> roles;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APPLICANT_ID")
    private PapApplicantInfo applicantInfo;

    @Transient
    public String getPhotosImagePath() {
        if (avatar == null || avatar.equalsIgnoreCase("") || avatar.isEmpty()) return "/user-avatars/placeholder.jpg";

//        return "/assets/img/avatars/" + avatar;
        return "/user-avatars/" + avatar;
    }

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    private boolean enabled;

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public PapApplicantInfo getApplicantInfo() {
        return applicantInfo;
    }

    public void setApplicantInfo(PapApplicantInfo applicantInfo) {
        this.applicantInfo = applicantInfo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Set<PapRole> getRoles() {
        return roles;
    }

    public void setRoles(Set<PapRole> roles) {
        this.roles = roles;
    }
}
