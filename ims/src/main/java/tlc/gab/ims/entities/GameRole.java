package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name = "game_role")
public class GameRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "CODE")
    private String code;

    @Column(name = "NAME")
    private String name;

    @Column(name = "GAME")
    private String game;

    @Column(name = "LICENSE_DURATION")
    private int licenseDuration;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "PREV_CODE")
    private String prevCode;

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

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public int getLicenseDuration() {
        return licenseDuration;
    }

    public void setLicenseDuration(int licenseDuration) {
        this.licenseDuration = licenseDuration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrevCode() {
        return prevCode;
    }

    public void setPrevCode(String prevCode) {
        this.prevCode = prevCode;
    }
}
