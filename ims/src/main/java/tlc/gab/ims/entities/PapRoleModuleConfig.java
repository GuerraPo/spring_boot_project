package tlc.gab.ims.entities;

import javax.persistence.*;

@Entity
@Table(name = "pap_role_module_config")
public class PapRoleModuleConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "role_id")
    private int roleId;

    @Column(name = "module_id")
    private int moduleId;

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public int getModuleId() {
        return moduleId;
    }

    public void setModuleId(int moduleId) {
        this.moduleId = moduleId;
    }
}
