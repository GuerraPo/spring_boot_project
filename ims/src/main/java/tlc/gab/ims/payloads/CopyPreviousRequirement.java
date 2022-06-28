package tlc.gab.ims.payloads;

public class CopyPreviousRequirement {

    private String account_id;
    private String id_for;

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
}
