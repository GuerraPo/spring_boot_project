package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name = "gab_games")
public class GabGames {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "CODE")
    private String code;

    @Column(name = "NAME")
    private String name;

    @Column(name = "CLASSIFICATION")
    private String classification;

    @Column(name = "SPORTS_CODE")
    private String sportsCode;

    @Column(name = "STATUS")
    private String status;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getSportsCode() {
        return sportsCode;
    }

    public void setSportsCode(String sportsCode) {
        this.sportsCode = sportsCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
