package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import restaurantapp.server.models.booking.Booking;
import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.repositories.BookingRepository;
import restaurantapp.server.repositories.ReceiptRepository;

import java.util.List;

@RestController
public class ReceiptController {

    @Autowired
    ReceiptRepository receiptRepository;

    @Autowired
    BookingRepository bookingRepository;

    @GetMapping("/receipts")
    public ResponseEntity<List<Receipt>> receipts() {
        return new ResponseEntity<>(receiptRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/receipts")
    public ResponseEntity<Receipt> addReceipt(@RequestBody Receipt receipt) {
        System.out.println(receipt);
        Booking updatedBooking = receipt.getBooking();
        updatedBooking.setReceipt(receipt);
        bookingRepository.updateById(updatedBooking.getDate(), updatedBooking.getTime(), updatedBooking.getNumOfPeople(), updatedBooking.getTableNum(), updatedBooking.getDuration(), updatedBooking.getStatus(), updatedBooking.getId());
        receiptRepository.save(receipt);
        return new ResponseEntity<>(receipt, HttpStatus.CREATED);
    }
}
