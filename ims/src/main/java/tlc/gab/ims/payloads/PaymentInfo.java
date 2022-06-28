package tlc.gab.ims.payloads;

public class PaymentInfo {

    private String CODE;
    private Double AMOUNT;
    private String FEENAME;

    public String getCODE() {
        return CODE;
    }

    public void setCODE(String CODE) {
        this.CODE = CODE;
    }

    public Double getAMOUNT() {
        return AMOUNT;
    }

    public void setAMOUNT(Double AMOUNT) {
        this.AMOUNT = AMOUNT;
    }

    public String getFEENAME() {
        return FEENAME;
    }

    public void setFEENAME(String FEENAME) {
        this.FEENAME = FEENAME;
    }
}
