package tlc.gab.ims.utils;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tlc.gab.ims.controllers.ApplicantRegistrationController;

import javax.xml.bind.DatatypeConverter;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class GeneralUtil {


    public GeneralUtil(){

    }

    Logger log = LoggerFactory.getLogger(GeneralUtil.class);

    public String getCurrentDateTime(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return(dtf.format(now));
    }

    public String getRandomText(){
        String result = RandomStringUtils.randomAlphabetic(15);
        return result;
    }

    public String decrypt(String encoded) {
        byte[] decoded = DatatypeConverter.parseBase64Binary(encoded);
        String decrypted = null;
        try {
            decrypted = new String(decoded, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            log.error("Unable to decrypt!",e);
        }
        return decrypted;
    }

    public String encrypt(String decoded) {
        String encrypted = null;
        try {
            encrypted = DatatypeConverter.printBase64Binary(decoded.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            log.error("Unable to encrypt!",e);
        }
        return encrypted;
    }
}
