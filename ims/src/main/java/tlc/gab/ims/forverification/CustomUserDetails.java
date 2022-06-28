package tlc.gab.ims.forverification;

import tlc.gab.ims.entities.PapUser;

public class CustomUserDetails {

    private PapUser user;

    public CustomUserDetails(PapUser user) {
        this.user = user;
    }

//    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }

    public PapUser getUser() {
        return user;
    }

    public void setUser(PapUser user) {
        this.user = user;
    }
}
