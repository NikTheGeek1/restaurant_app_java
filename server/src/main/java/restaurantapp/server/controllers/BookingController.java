package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import restaurantapp.server.models.booking.Booking;
import restaurantapp.server.repositories.BookingRepository;

import java.util.List;

@RestController
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> bookings() {
        return new ResponseEntity<>(bookingRepository.findAll(), HttpStatus.OK);
    }
}
