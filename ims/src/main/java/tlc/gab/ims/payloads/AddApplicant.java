package tlc.gab.ims.payloads;

public class AddApplicant {

    private String vSPORTS;
    private String vROLES;
    private String vLICENSE_NUMBER;
    private String vFIRST_NAME;
    private String vMIDDLE_NAME;
    private String vLAST_NAME;
    private String vNICK_NAME;
    private String vHOME_ADDRESS;
    private String vTELEPHONE_HOME;
    private String vOFFICE_ADDRESS;
    private String vTELEPHONE_OFFICE;
    private String vBIRTH_PLACE;
    private String vBIRTH_DATE;
    private String vAGE;
    private String vGENDER;
    private String vHEIGHT;
    private String vWEIGHT;
    private String vCITIZENSHIP;
    private String vCIVILSTATUS;
    private String vCLUB;
    private String vACCUSED_CRIME;
    private String vSTATE_OFFENSE;
    private String vSSS;
    private String vRING_NAME;
    private String vHAIR_COLOR;
    private String vEYE_COLOR;
    private String vPARENTS_FIRST_NAME;
    private String vPARENTS_MIDDLE_NAME;
    private String vPARENTS_LAST_NAME;
    private String vPARENTS_NICK_NAME;
    private String vMANAGER_FIRST_NAME;
    private String vMANAGER_MIDDLE_NAME;
    private String vMANAGER_LAST_NAME;
    private String vMANAGER_NICK_NAME;
    private String vEDUCATION_BACKGROUND;
    private String vPROMOTION_CONTRACT;
    private String vGAB_DENIED;
    private String vFIGHT_RECORD;
    private String vAMATEUR_RECORD;
    private String vROUNDER;
    private String vTRAINING;
    private String vPROFESSIONAL_PERIOD;
    private String vAPPLICANT_DATE;
    private String vLOCATION;
    private String vDATE_EVENT;
    private String vPROCLAMATION;
    private String vBENIFICIARY;
    private String vREQUEST;
    private String vFOREIGN_PARTICIPANTS;
    private String vPROMOTER;
    private String vBOUTS;
    private String vTV_COVERAGE;
    private String vTICKETS;
    private String vDATE_WEIGHT_IN;
    private String vTIME_WEIGHTIN;
    private String vPLACE_WEIGHT_IN;
    private String vWEIGHT_SCALE;
    private String vTIME_EVENT;
    private String vPLACE_EVENT;
    private String vTELEPHONE_EVENT;
    private String vAMBULANCE;
    private String vHOSPITAL_NEARBY;
    private String vDATE_START;
    private String vDATE_END;
    private String vEVENT;
    private String vPERMIT_NUMBER;
    private String vAPPLICATION_FOR;
    private String vGYM;
    private String vDATE_APPLIED;
    private String vDATE_FIGHT;
    private String vPASSPORT_FIRST_NAME;
    private String vPASSPORT_MIDDLE_NAME;
    private String vPASSPORT_LAST_NAME;
    private String vOPPONENT_FIRST_NAME;
    private String vOPPONENT_MIDDLE_NAME;
    private String vOPPONENT_LAST_NAME;
    private String vOPPONENT_NICK_NAME;
    private String vTITLE_WEIGHT;
    private String vROUNDS;
    private String vDATE_CONTEST;
    private String vFIGHT_RECORDS;
    private String vCONTEST_PLACE;
    private String vAPPLICATION_TYPE;
    private String vSTATUS;
    private String vOFFICE;
    private String vCREATED_BY;
    private String vSUFFIX;

    private String vACCOUNTID;
    private String vDIVISION;
    private String vAVATAR;
    private String vSAVE_AS_DRAFT;

    private String vID_FOR;
    private String vREASONS_FOR_ID_REPRINT;
    private String vTYPE_CODE;

    private String vUSERNAME;

    public String getvREASONS_FOR_ID_REPRINT() {
        return vREASONS_FOR_ID_REPRINT;
    }

    public void setvREASONS_FOR_ID_REPRINT(String vREASONS_FOR_ID_REPRINT) {
        this.vREASONS_FOR_ID_REPRINT = vREASONS_FOR_ID_REPRINT;
    }

    public String getvID_FOR() {
        return vID_FOR;
    }

    public void setvID_FOR(String vID_FOR) {
        this.vID_FOR = vID_FOR;
    }

    public String getvSAVE_AS_DRAFT() {
        return vSAVE_AS_DRAFT;
    }

    public void setvSAVE_AS_DRAFT(String vSAVE_AS_DRAFT) {
        this.vSAVE_AS_DRAFT = vSAVE_AS_DRAFT;
    }

    public String getvAVATAR() {
        return vAVATAR;
    }

    public void setvAVATAR(String vAVATAR) {
        this.vAVATAR = checkStringIfNull(vAVATAR);
    }

    public String getvDIVISION() {
        return vDIVISION;
    }

    public void setvDIVISION(String vDIVISION) {
        this.vDIVISION = vDIVISION;
    }

    public String getvSPORTS() {
        return vSPORTS;
    }

    public void setvSPORTS(String vSPORTS) {
        this.vSPORTS = vSPORTS;
    }

    public String getvROLES() {
        return vROLES;
    }

    public void setvROLES(String vROLES) {
        this.vROLES = vROLES;
    }

    public String getvLICENSE_NUMBER() {
        return vLICENSE_NUMBER;
    }

    public void setvLICENSE_NUMBER(String vLICENSE_NUMBER) {
        this.vLICENSE_NUMBER = vLICENSE_NUMBER;
    }

    public String getvFIRST_NAME() {
        return vFIRST_NAME;
    }

    public void setvFIRST_NAME(String vFIRST_NAME) {
        this.vFIRST_NAME = vFIRST_NAME;
    }

    public String getvMIDDLE_NAME() {
        return vMIDDLE_NAME;
    }

    public void setvMIDDLE_NAME(String vMIDDLE_NAME) {
        this.vMIDDLE_NAME = vMIDDLE_NAME;
    }

    public String getvLAST_NAME() {
        return vLAST_NAME;
    }

    public void setvLAST_NAME(String vLAST_NAME) {
        this.vLAST_NAME = vLAST_NAME;
    }

    public String getvNICK_NAME() {
        return vNICK_NAME;
    }

    public void setvNICK_NAME(String vNICK_NAME) {
        this.vNICK_NAME = vNICK_NAME;
    }

    public String getvHOME_ADDRESS() {
        return vHOME_ADDRESS;
    }

    public void setvHOME_ADDRESS(String vHOME_ADDRESS) {
        this.vHOME_ADDRESS = vHOME_ADDRESS;
    }

    public String getvTELEPHONE_HOME() {
        return vTELEPHONE_HOME;
    }

    public void setvTELEPHONE_HOME(String vTELEPHONE_HOME) {
        this.vTELEPHONE_HOME = vTELEPHONE_HOME;
    }

    public String getvOFFICE_ADDRESS() {
        return vOFFICE_ADDRESS;
    }

    public void setvOFFICE_ADDRESS(String vOFFICE_ADDRESS) {
        this.vOFFICE_ADDRESS = vOFFICE_ADDRESS;
    }

    public String getvTELEPHONE_OFFICE() {
        return vTELEPHONE_OFFICE;
    }

    public void setvTELEPHONE_OFFICE(String vTELEPHONE_OFFICE) {
        this.vTELEPHONE_OFFICE = vTELEPHONE_OFFICE;
    }

    public String getvBIRTH_PLACE() {
        return vBIRTH_PLACE;
    }

    public void setvBIRTH_PLACE(String vBIRTH_PLACE) {
        this.vBIRTH_PLACE = vBIRTH_PLACE;
    }

    public String getvBIRTH_DATE() {
        return vBIRTH_DATE;
    }

    public void setvBIRTH_DATE(String vBIRTH_DATE) {
        this.vBIRTH_DATE = vBIRTH_DATE;
    }

    public String getvAGE() {
        return vAGE;
    }

    public void setvAGE(String vAGE) {
        this.vAGE = vAGE;
    }

    public String getvGENDER() {
        return vGENDER;
    }

    public void setvGENDER(String vGENDER) {
        this.vGENDER = vGENDER;
    }

    public String getvHEIGHT() {
        return vHEIGHT;
    }

    public void setvHEIGHT(String vHEIGHT) {
        this.vHEIGHT = vHEIGHT;
    }

    public String getvWEIGHT() {
        return vWEIGHT;
    }

    public void setvWEIGHT(String vWEIGHT) {
        this.vWEIGHT = vWEIGHT;
    }

    public String getvCITIZENSHIP() {
        return vCITIZENSHIP;
    }

    public void setvCITIZENSHIP(String vCITIZENSHIP) {
        this.vCITIZENSHIP = vCITIZENSHIP;
    }

    public String getvCIVILSTATUS() {
        return vCIVILSTATUS;
    }

    public void setvCIVILSTATUS(String vCIVILSTATUS) {
        this.vCIVILSTATUS = vCIVILSTATUS;
    }

    public String getvCLUB() {
        return vCLUB;
    }

    public void setvCLUB(String vCLUB) {
        this.vCLUB = vCLUB;
    }

    public String getvACCUSED_CRIME() {
        return vACCUSED_CRIME;
    }

    public void setvACCUSED_CRIME(String vACCUSED_CRIME) {
        if(vACCUSED_CRIME == null){
            vACCUSED_CRIME = "NO";
        }
        this.vACCUSED_CRIME = checkStringIfNull(vACCUSED_CRIME);
    }

    public String getvSTATE_OFFENSE() {
        return vSTATE_OFFENSE;
    }

    public void setvSTATE_OFFENSE(String vSTATE_OFFENSE) {
        this.vSTATE_OFFENSE = checkStringIfNull(vSTATE_OFFENSE);
    }

    public String getvSSS() {
        return vSSS;
    }

    public void setvSSS(String vSSS) {
        this.vSSS = vSSS;
    }

    public String getvRING_NAME() {
        return vRING_NAME;
    }

    public void setvRING_NAME(String vRING_NAME) {
        this.vRING_NAME = vRING_NAME;
    }

    public String getvHAIR_COLOR() {
        return vHAIR_COLOR;
    }

    public void setvHAIR_COLOR(String vHAIR_COLOR) {
        this.vHAIR_COLOR = vHAIR_COLOR;
    }

    public String getvEYE_COLOR() {
        return vEYE_COLOR;
    }

    public void setvEYE_COLOR(String vEYE_COLOR) {
        this.vEYE_COLOR = vEYE_COLOR;
    }

    public String getvPARENTS_FIRST_NAME() {
        return vPARENTS_FIRST_NAME;
    }

    public void setvPARENTS_FIRST_NAME(String vPARENTS_FIRST_NAME) {
        this.vPARENTS_FIRST_NAME = vPARENTS_FIRST_NAME;
    }

    public String getvPARENTS_MIDDLE_NAME() {
        return vPARENTS_MIDDLE_NAME;
    }

    public void setvPARENTS_MIDDLE_NAME(String vPARENTS_MIDDLE_NAME) {
        this.vPARENTS_MIDDLE_NAME = vPARENTS_MIDDLE_NAME;
    }

    public String getvPARENTS_LAST_NAME() {
        return vPARENTS_LAST_NAME;
    }

    public void setvPARENTS_LAST_NAME(String vPARENTS_LAST_NAME) {
        this.vPARENTS_LAST_NAME = vPARENTS_LAST_NAME;
    }

    public String getvPARENTS_NICK_NAME() {
        return vPARENTS_NICK_NAME;
    }

    public void setvPARENTS_NICK_NAME(String vPARENTS_NICK_NAME) {
        this.vPARENTS_NICK_NAME = vPARENTS_NICK_NAME;
    }

    public String getvMANAGER_FIRST_NAME() {
        return vMANAGER_FIRST_NAME;
    }

    public void setvMANAGER_FIRST_NAME(String vMANAGER_FIRST_NAME) {
        this.vMANAGER_FIRST_NAME = vMANAGER_FIRST_NAME;
    }

    public String getvMANAGER_MIDDLE_NAME() {
        return vMANAGER_MIDDLE_NAME;
    }

    public void setvMANAGER_MIDDLE_NAME(String vMANAGER_MIDDLE_NAME) {
        this.vMANAGER_MIDDLE_NAME = vMANAGER_MIDDLE_NAME;
    }

    public String getvMANAGER_LAST_NAME() {
        return vMANAGER_LAST_NAME;
    }

    public void setvMANAGER_LAST_NAME(String vMANAGER_LAST_NAME) {
        this.vMANAGER_LAST_NAME = vMANAGER_LAST_NAME;
    }

    public String getvMANAGER_NICK_NAME() {
        return vMANAGER_NICK_NAME;
    }

    public void setvMANAGER_NICK_NAME(String vMANAGER_NICK_NAME) {
        this.vMANAGER_NICK_NAME = vMANAGER_NICK_NAME;
    }

    public String getvEDUCATION_BACKGROUND() {
        return vEDUCATION_BACKGROUND;
    }

    public void setvEDUCATION_BACKGROUND(String vEDUCATION_BACKGROUND) {
        this.vEDUCATION_BACKGROUND = vEDUCATION_BACKGROUND;
    }

    public String getvPROMOTION_CONTRACT() {
        return vPROMOTION_CONTRACT;
    }

    public void setvPROMOTION_CONTRACT(String vPROMOTION_CONTRACT) {
        this.vPROMOTION_CONTRACT = vPROMOTION_CONTRACT;
    }

    public String getvGAB_DENIED() {
        return vGAB_DENIED;
    }

    public void setvGAB_DENIED(String vGAB_DENIED) {
        this.vGAB_DENIED = vGAB_DENIED;
    }

    public String getvFIGHT_RECORD() {
        return vFIGHT_RECORD;
    }

    public void setvFIGHT_RECORD(String vFIGHT_RECORD) {
        this.vFIGHT_RECORD = vFIGHT_RECORD;
    }

    public String getvAMATEUR_RECORD() {
        return vAMATEUR_RECORD;
    }

    public void setvAMATEUR_RECORD(String vAMATEUR_RECORD) {
        this.vAMATEUR_RECORD = vAMATEUR_RECORD;
    }

    public String getvROUNDER() {
        return vROUNDER;
    }

    public void setvROUNDER(String vROUNDER) {
        this.vROUNDER = vROUNDER;
    }

    public String getvTRAINING() {
        return vTRAINING;
    }

    public void setvTRAINING(String vTRAINING) {
        this.vTRAINING = vTRAINING;
    }

    public String getvPROFESSIONAL_PERIOD() {
        return vPROFESSIONAL_PERIOD;
    }

    public void setvPROFESSIONAL_PERIOD(String vPROFESSIONAL_PERIOD) {
        this.vPROFESSIONAL_PERIOD = vPROFESSIONAL_PERIOD;
    }

    public String getvAPPLICANT_DATE() {
        return vAPPLICANT_DATE;
    }

    public void setvAPPLICANT_DATE(String vAPPLICANT_DATE) {
        this.vAPPLICANT_DATE = vAPPLICANT_DATE;
    }

    public String getvLOCATION() {
        return vLOCATION;
    }

    public void setvLOCATION(String vLOCATION) {
        this.vLOCATION = vLOCATION;
    }

    public String getvDATE_EVENT() {
        return vDATE_EVENT;
    }

    public void setvDATE_EVENT(String vDATE_EVENT) {
        this.vDATE_EVENT = vDATE_EVENT;
    }

    public String getvPROCLAMATION() {
        return vPROCLAMATION;
    }

    public void setvPROCLAMATION(String vPROCLAMATION) {
        this.vPROCLAMATION = vPROCLAMATION;
    }

    public String getvBENIFICIARY() {
        return vBENIFICIARY;
    }

    public void setvBENIFICIARY(String vBENIFICIARY) {
        this.vBENIFICIARY = vBENIFICIARY;
    }

    public String getvREQUEST() {
        return vREQUEST;
    }

    public void setvREQUEST(String vREQUEST) {
        this.vREQUEST = vREQUEST;
    }

    public String getvFOREIGN_PARTICIPANTS() {
        return vFOREIGN_PARTICIPANTS;
    }

    public void setvFOREIGN_PARTICIPANTS(String vFOREIGN_PARTICIPANTS) {
        this.vFOREIGN_PARTICIPANTS = vFOREIGN_PARTICIPANTS;
    }

    public String getvPROMOTER() {
        return vPROMOTER;
    }

    public void setvPROMOTER(String vPROMOTER) {
        this.vPROMOTER = vPROMOTER;
    }

    public String getvBOUTS() {
        return vBOUTS;
    }

    public void setvBOUTS(String vBOUTS) {
        this.vBOUTS = vBOUTS;
    }

    public String getvTV_COVERAGE() {
        return vTV_COVERAGE;
    }

    public void setvTV_COVERAGE(String vTV_COVERAGE) {
        this.vTV_COVERAGE = vTV_COVERAGE;
    }

    public String getvTICKETS() {
        return vTICKETS;
    }

    public void setvTICKETS(String vTICKETS) {
        this.vTICKETS = vTICKETS;
    }

    public String getvDATE_WEIGHT_IN() {
        return vDATE_WEIGHT_IN;
    }

    public void setvDATE_WEIGHT_IN(String vDATE_WEIGHT_IN) {
        this.vDATE_WEIGHT_IN = vDATE_WEIGHT_IN;
    }

    public String getvTIME_WEIGHTIN() {
        return vTIME_WEIGHTIN;
    }

    public void setvTIME_WEIGHTIN(String vTIME_WEIGHTIN) {
        this.vTIME_WEIGHTIN = vTIME_WEIGHTIN;
    }

    public String getvPLACE_WEIGHT_IN() {
        return vPLACE_WEIGHT_IN;
    }

    public void setvPLACE_WEIGHT_IN(String vPLACE_WEIGHT_IN) {
        this.vPLACE_WEIGHT_IN = vPLACE_WEIGHT_IN;
    }

    public String getvWEIGHT_SCALE() {
        return vWEIGHT_SCALE;
    }

    public void setvWEIGHT_SCALE(String vWEIGHT_SCALE) {
        this.vWEIGHT_SCALE = vWEIGHT_SCALE;
    }

    public String getvTIME_EVENT() {
        return vTIME_EVENT;
    }

    public void setvTIME_EVENT(String vTIME_EVENT) {
        this.vTIME_EVENT = vTIME_EVENT;
    }

    public String getvPLACE_EVENT() {
        return vPLACE_EVENT;
    }

    public void setvPLACE_EVENT(String vPLACE_EVENT) {
        this.vPLACE_EVENT = vPLACE_EVENT;
    }

    public String getvTELEPHONE_EVENT() {
        return vTELEPHONE_EVENT;
    }

    public void setvTELEPHONE_EVENT(String vTELEPHONE_EVENT) {
        this.vTELEPHONE_EVENT = vTELEPHONE_EVENT;
    }

    public String getvAMBULANCE() {
        return vAMBULANCE;
    }

    public void setvAMBULANCE(String vAMBULANCE) {
        this.vAMBULANCE = vAMBULANCE;
    }

    public String getvHOSPITAL_NEARBY() {
        return vHOSPITAL_NEARBY;
    }

    public void setvHOSPITAL_NEARBY(String vHOSPITAL_NEARBY) {
        this.vHOSPITAL_NEARBY = vHOSPITAL_NEARBY;
    }

    public String getvDATE_START() {
        return vDATE_START;
    }

    public void setvDATE_START(String vDATE_START) {
        this.vDATE_START = checkStringDateIfNull(vDATE_START);
    }

    public String getvDATE_END() {
        return vDATE_END;
    }

    public void setvDATE_END(String vDATE_END) {
        this.vDATE_END = checkStringDateIfNull(vDATE_END);
    }

    public String getvEVENT() {
        return vEVENT;
    }

    public void setvEVENT(String vEVENT) {
        this.vEVENT = vEVENT;
    }

    public String getvPERMIT_NUMBER() {
        return vPERMIT_NUMBER;
    }

    public void setvPERMIT_NUMBER(String vPERMIT_NUMBER) {
        this.vPERMIT_NUMBER = vPERMIT_NUMBER;
    }

    public String getvAPPLICATION_FOR() {
        return vAPPLICATION_FOR;
    }

    public void setvAPPLICATION_FOR(String vAPPLICATION_FOR) {
        this.vAPPLICATION_FOR = vAPPLICATION_FOR;
    }

    public String getvGYM() {
        return vGYM;
    }

    public void setvGYM(String vGYM) {
        this.vGYM = vGYM;
    }

    public String getvDATE_APPLIED() {
        return vDATE_APPLIED;
    }

    public void setvDATE_APPLIED(String vDATE_APPLIED) {
        this.vDATE_APPLIED = vDATE_APPLIED;
    }

    public String getvDATE_FIGHT() {
        return vDATE_FIGHT;
    }

    public void setvDATE_FIGHT(String vDATE_FIGHT) {
        this.vDATE_FIGHT = vDATE_FIGHT;
    }

    public String getvPASSPORT_FIRST_NAME() {
        return vPASSPORT_FIRST_NAME;
    }

    public void setvPASSPORT_FIRST_NAME(String vPASSPORT_FIRST_NAME) {
        this.vPASSPORT_FIRST_NAME = vPASSPORT_FIRST_NAME;
    }

    public String getvPASSPORT_MIDDLE_NAME() {
        return vPASSPORT_MIDDLE_NAME;
    }

    public void setvPASSPORT_MIDDLE_NAME(String vPASSPORT_MIDDLE_NAME) {
        this.vPASSPORT_MIDDLE_NAME = vPASSPORT_MIDDLE_NAME;
    }

    public String getvPASSPORT_LAST_NAME() {
        return vPASSPORT_LAST_NAME;
    }

    public void setvPASSPORT_LAST_NAME(String vPASSPORT_LAST_NAME) {
        this.vPASSPORT_LAST_NAME = vPASSPORT_LAST_NAME;
    }

    public String getvOPPONENT_FIRST_NAME() {
        return vOPPONENT_FIRST_NAME;
    }

    public void setvOPPONENT_FIRST_NAME(String vOPPONENT_FIRST_NAME) {
        this.vOPPONENT_FIRST_NAME = vOPPONENT_FIRST_NAME;
    }

    public String getvOPPONENT_MIDDLE_NAME() {
        return vOPPONENT_MIDDLE_NAME;
    }

    public void setvOPPONENT_MIDDLE_NAME(String vOPPONENT_MIDDLE_NAME) {
        this.vOPPONENT_MIDDLE_NAME = vOPPONENT_MIDDLE_NAME;
    }

    public String getvOPPONENT_LAST_NAME() {
        return vOPPONENT_LAST_NAME;
    }

    public void setvOPPONENT_LAST_NAME(String vOPPONENT_LAST_NAME) {
        this.vOPPONENT_LAST_NAME = vOPPONENT_LAST_NAME;
    }

    public String getvOPPONENT_NICK_NAME() {
        return vOPPONENT_NICK_NAME;
    }

    public void setvOPPONENT_NICK_NAME(String vOPPONENT_NICK_NAME) {
        this.vOPPONENT_NICK_NAME = vOPPONENT_NICK_NAME;
    }

    public String getvTITLE_WEIGHT() {
        return vTITLE_WEIGHT;
    }

    public void setvTITLE_WEIGHT(String vTITLE_WEIGHT) {
        this.vTITLE_WEIGHT = vTITLE_WEIGHT;
    }

    public String getvROUNDS() {
        return vROUNDS;
    }

    public void setvROUNDS(String vROUNDS) {
        this.vROUNDS = vROUNDS;
    }

    public String getvDATE_CONTEST() {
        return vDATE_CONTEST;
    }

    public void setvDATE_CONTEST(String vDATE_CONTEST) {
        this.vDATE_CONTEST = vDATE_CONTEST;
    }

    public String getvFIGHT_RECORDS() {
        return vFIGHT_RECORDS;
    }

    public void setvFIGHT_RECORDS(String vFIGHT_RECORDS) {
        this.vFIGHT_RECORDS = vFIGHT_RECORDS;
    }

    public String getvCONTEST_PLACE() {
        return vCONTEST_PLACE;
    }

    public void setvCONTEST_PLACE(String vCONTEST_PLACE) {
        this.vCONTEST_PLACE = vCONTEST_PLACE;
    }

    public String getvAPPLICATION_TYPE() {
        return vAPPLICATION_TYPE;
    }

    public void setvAPPLICATION_TYPE(String vAPPLICATION_TYPE) {
        this.vAPPLICATION_TYPE = vAPPLICATION_TYPE;
    }

    public String getvSTATUS() {
        return vSTATUS;
    }

    public void setvSTATUS(String vSTATUS) {
        this.vSTATUS = vSTATUS;
    }

    public String getvOFFICE() {
        return vOFFICE;
    }

    public void setvOFFICE(String vOFFICE) {
        this.vOFFICE = vOFFICE;
    }

    public String getvCREATED_BY() {
        return vCREATED_BY;
    }

    public void setvCREATED_BY(String vCREATED_BY) {
        this.vCREATED_BY = vCREATED_BY;
    }

    public String getvSUFFIX() {
        return vSUFFIX;
    }

    public void setvSUFFIX(String vSUFFIX) {
        this.vSUFFIX = checkStringIfNull(vSUFFIX);
    }

    public String getvACCOUNTID() {
        return vACCOUNTID;
    }

    public void setvACCOUNTID(String vACCOUNTID) {
        this.vACCOUNTID = vACCOUNTID;
    }

    public String getvUSERNAME() {
        return vUSERNAME;
    }

    public void setvUSERNAME(String vUSERNAME) {
        this.vUSERNAME = vUSERNAME;
    }

    public String getvTYPE_CODE() {
        return vTYPE_CODE;
    }

    public void setvTYPE_CODE(String vTYPE_CODE) {
        this.vTYPE_CODE = vTYPE_CODE;
    }

    private String checkStringIfNull(String var){
        String val = "";
        if(var!=null){
            val = var;
        }
        return val;
    }

    private String checkStringDateIfNull(String var){
        String val = "0000-00-00";
        if(var!=null){
            val = var;
        }
        return val;
    }
}
