package tlc.gab.ims.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tlc.gab.ims.entities.GabInvoiceLines;
import tlc.gab.ims.payloads.PaymentInfo;
import tlc.gab.ims.repositories.GabInvoiceLinesRepo;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {

    Logger log = LoggerFactory.getLogger(PaymentService.class);

    @Autowired
    private GabInvoiceLinesRepo invoiceLinesRepo;

    public ResponseEntity getPaymentDetails(String accountId) {
        ResponseEntity response = new ResponseEntity<>("Failed!", HttpStatus.BAD_REQUEST);
        try{
            List<PaymentInfo> paymentInfoList = new ArrayList<>();
            String invoiceCode = invoiceLinesRepo.getInvoiceCode(accountId);
            List<GabInvoiceLines> invoiceLinesList = invoiceLinesRepo.findByInvoiceCode(invoiceCode);
            for(GabInvoiceLines invoiceLine : invoiceLinesList){
                String code = invoiceLine.getCode();
                String feeCode = invoiceLine.getFees();

                String accountCode = invoiceLinesRepo.getAccountCode(feeCode);
                String feeName = invoiceLinesRepo.getFeename(feeCode);
                PaymentInfo paymentInfo = new PaymentInfo();
                paymentInfo.setCODE(accountCode);
                paymentInfo.setFEENAME(feeName);
                paymentInfo.setAMOUNT(invoiceLine.getAmount());

                paymentInfoList.add(paymentInfo);
            }

            response = new ResponseEntity<>(paymentInfoList, HttpStatus.OK);
        }catch(Exception e){
            log.error("Failed!",e);
        }
        return response;
    }
}
