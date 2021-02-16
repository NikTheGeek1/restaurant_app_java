package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/bookings")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
        List<Booking> existingBookings = bookingRepository.findAll();
        if (Booking.isBookingAvailable(booking, existingBookings)) {
            bookingRepository.save(booking);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        }
        return new ResponseEntity<>(booking, HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/bookings")
    public ResponseEntity<Booking> updateBooking(@RequestParam(name = "bookingId") Long id, @RequestBody Booking updatedBooking) {
        if (id != null) {
            List<Booking> existingBookings = Booking.removeBookingById(updatedBooking, bookingRepository.findAll());
            if (Booking.isBookingAvailable(updatedBooking, existingBookings)) {
                bookingRepository.updateById(updatedBooking.getDate(), updatedBooking.getTime(), updatedBooking.getNumOfPeople(), updatedBooking.getTableNum(), updatedBooking.getStatus(), updatedBooking.getId());
                return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
            }
            return new ResponseEntity<>(updatedBooking, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updatedBooking, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/bookings")
    public ResponseEntity<Void> deleteBooking(@RequestParam(name = "bookingId") Long id) {
        if (id != null) {
            bookingRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}
