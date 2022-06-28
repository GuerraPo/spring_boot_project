package tlc.gab.ims.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tlc.gab.ims.services.PaymentService;

@Controller
@RequestMapping("/online-payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get-payment-details")
    public ResponseEntity<?> registerApplicant(Authentication authentication, @RequestParam("account_id") String accountId) {
        ResponseEntity responseEntity = paymentService.getPaymentDetails(accountId);
        return responseEntity;
    }
}
