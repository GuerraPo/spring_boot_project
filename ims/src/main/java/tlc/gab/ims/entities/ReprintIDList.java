package tlc.gab.ims.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "gab_reprint_id_list")
public class ReprintIDList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "account_id")
    private String account_id;

    @Column(name = "id_for")
    private String id_for;

    @Column(name = "reason")
    private String reason;

    @UpdateTimestamp
    @Column(name = "MODIFIED_DATETIME")
    private LocalDateTime modified_datetime;

    @CreationTimestamp
    @Column(name = "CREATED_DATETIME")
    private LocalDateTime created_datetime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccount_id() {
        return account_id;
    }

    public void setAccount_id(String account_id) {
        this.account_id = account_id;
    }

    public String getId_for() {
        return id_for;
    }

    public void setId_for(String id_for) {
        this.id_for = id_for;
    }

    public LocalDateTime getCreated_datetime() {
        return created_datetime;
    }

    public void setCreated_datetime(LocalDateTime created_datetime) {
        this.created_datetime = created_datetime;
    }

    public LocalDateTime getModified_datetime() {
        return modified_datetime;
    }

    public void setModified_datetime(LocalDateTime modified_datetime) {
        this.modified_datetime = modified_datetime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
