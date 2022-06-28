package tlc.gab.ims.payloads;

import org.springframework.web.multipart.MultipartFile;

public class AddRequirements {

    private String ACCOUNT_ID;
    private String REQUIREMENTS;
    private String TYPE;
    private String DIR;
    private int STATUS;
    private String FILE_EXT;
    private MultipartFile FILE;

    public String getACCOUNT_ID() {
        return ACCOUNT_ID;
    }

    public void setACCOUNT_ID(String ACCOUNT_ID) {
        this.ACCOUNT_ID = ACCOUNT_ID;
    }

    public String getREQUIREMENTS() {
        return REQUIREMENTS;
    }

    public void setREQUIREMENTS(String REQUIREMENTS) {
        this.REQUIREMENTS = REQUIREMENTS;
    }

    public String getTYPE() {
        return TYPE;
    }

    public void setTYPE(String TYPE) {
        this.TYPE = TYPE;
    }

    public String getDIR() {
        return DIR;
    }

    public void setDIR(String DIR) {
        this.DIR = DIR;
    }

    public int getSTATUS() {
        return STATUS;
    }

    public void setSTATUS(int STATUS) {
        this.STATUS = STATUS;
    }

    public String getFILE_EXT() {
        return FILE_EXT;
    }

    public void setFILE_EXT(String FILE_EXT) {
        this.FILE_EXT = FILE_EXT;
    }

    public MultipartFile getFile() {
        return FILE;
    }

    public void setFile(MultipartFile file) {
        this.FILE = file;
    }
}
