package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.repositories.ReceiptRepository;

import java.util.List;

@RestController
public class ReceiptController {

    @Autowired
    ReceiptRepository receiptRepository;

    @GetMapping("/receipts")
    public ResponseEntity<List<Receipt>> receipts() {
        return new ResponseEntity<>(receiptRepository.findAll(), HttpStatus.OK);
    }
}
