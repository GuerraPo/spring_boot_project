package tlc.gab.ims.entities;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "webuserslevel")
public class WebUserLevel {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private int userLevelId;
	
	@Column(name = "ROLEID")
	private int roleId;
	
	@Column(name = "ROLE_NAME")
	private String roleName;
	
	@Column(name = "DESCRIPTION")
	private String desc;
	
	@Column(name = "STATUS")
	private String status;
	
	public int getUserLevelId() {
		return userLevelId;
	}

	public void setUserLevelId(int userLevelId) {
		this.userLevelId = userLevelId;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
}
