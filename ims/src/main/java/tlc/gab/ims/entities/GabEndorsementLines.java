package tlc.gab.ims.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "gab_endorsement_lines")
public class GabEndorsementLines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "CODE")
    private String code;

    @Column(name = "EVENT_NAME")
    private String eventName;

    @Column(name = "EVENT_START")
    private String eventStart;

    @Column(name = "EVENT_END")
    private String eventEnd;

    @Column(name = "EVENT_LOCATION")
    private String eventLocation;

    @Column(name = "CREATED_BY")
    private String createdBy;

    @Column(name = "CREATED_DATETIME", columnDefinition = "DATETIME default current_timestamp()")
    private String createdDateTime;

    @Column(name = "MODIFIED_BY", columnDefinition = "DATETIME default current_timestamp()")
    private String modifiedBy;

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

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventStart() {
        return eventStart;
    }

    public void setEventStart(String eventStart) {
        this.eventStart = eventStart;
    }

    public String getEventEnd() {
        return eventEnd;
    }

    public void setEventEnd(String eventEnd) {
        this.eventEnd = eventEnd;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
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
}
