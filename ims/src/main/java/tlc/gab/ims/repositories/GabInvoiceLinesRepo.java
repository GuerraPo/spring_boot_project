package tlc.gab.ims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tlc.gab.ims.entities.GabInvoiceLines;
import tlc.gab.ims.payloads.PaymentInfo;

import java.util.List;

@Repository
public interface GabInvoiceLinesRepo extends JpaRepository<GabInvoiceLines,String> {

    @Query(value = "SELECT CODE FROM gab_invoice WHERE ACCOUNT_ID = :accountId", nativeQuery = true)
    String getInvoiceCode(String accountId);

    @Query(value = "SELECT * FROM gab_invoice_lines WHERE CODE = :invoiceCode", nativeQuery = true)
    List<GabInvoiceLines> findByInvoiceCode(String invoiceCode);

    @Query(value = "SELECT ACCOUNT_CODE FROM fee_list WHERE CODE = :fee", nativeQuery = true)
    String getAccountCode(String fee);

    @Query(value = "SELECT DESCRIPTION FROM fee_list WHERE CODE = :fee", nativeQuery = true)
    String getFeename(String fee);
}
