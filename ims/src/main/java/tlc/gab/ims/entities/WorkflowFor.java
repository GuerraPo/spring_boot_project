package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name="workflow_for")
public class WorkflowFor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "GAME_ROLE")
    private String game_role;

    @Column(name = "WORKFLOW")
    private String workflow;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGame_role() {
        return game_role;
    }

    public void setGame_role(String game_role) {
        this.game_role = game_role;
    }

    public String getWorkflow() {
        return workflow;
    }

    public void setWorkflow(String workflow) {
        this.workflow = workflow;
    }
}
