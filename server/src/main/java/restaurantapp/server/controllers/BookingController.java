package restaurantapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restaurantapp.server.models.Customer;
import restaurantapp.server.models.booking.Booking;
import restaurantapp.server.models.booking.Status;
import restaurantapp.server.repositories.BookingRepository;
import restaurantapp.server.repositories.CustomerRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> bookings(
            @RequestParam(name = "date", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(name = "status", required = false) String bookingStatus
    ) {
        if (date != null && bookingStatus != null) {
            if (bookingStatus.equals("PENDING")) {
                return new ResponseEntity<>(bookingRepository.findByDateAndStatus(date, Status.PENDING), HttpStatus.OK);
            }
            return new ResponseEntity<>(bookingRepository.findByDateAndStatus(date, Status.DONE), HttpStatus.OK);
        }
        if (date != null && bookingStatus != null && bookingStatus.equals("done")) {
            return new ResponseEntity<>(bookingRepository.findByDateAndStatus(date, Status.DONE), HttpStatus.OK);
        }
        if (bookingStatus != null) {
            if (bookingStatus.equals("PENDING")) {
                return new ResponseEntity<>(bookingRepository.findByStatus(Status.PENDING), HttpStatus.OK);
            }
            return new ResponseEntity<>(bookingRepository.findByStatus(Status.DONE), HttpStatus.OK);
        }

        if (date != null) {
            return new ResponseEntity<>(bookingRepository.findByDate(date), HttpStatus.OK);
        }
        return new ResponseEntity<>(bookingRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/bookings")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        List<Booking> existingBookings = bookingRepository.findAll();
        if (Booking.isBookingAvailable(booking, existingBookings)) {
            bookingRepository.save(booking);
            return new ResponseEntity<>(booking, HttpStatus.CREATED);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Booking not available.", HttpStatus.BAD_REQUEST));
    }

    @PostMapping("/bookings/make-reservation")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking,
                                        @RequestParam(name = "email") String email) {
        List<Booking> existingBookings = bookingRepository.findAll();
        if (Booking.isBookingAvailable(booking, existingBookings)) {
            List<Customer> customerList = customerRepository.findByEmail(email);
            Customer customer;
            if (customerList.isEmpty()) {
                customer = new Customer(email, "123", email);
                customerRepository.save(customer);
            } else {
                customer = customerList.get(0);
            }
            booking.setCustomer(customer);
            bookingRepository.save(booking);
            return new ResponseEntity<>(booking, HttpStatus.CREATED);
        }
        System.out.println(booking.getTime());
        System.out.println(booking.getDuration());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage("Booking not available.", HttpStatus.BAD_REQUEST));
    }

    @PatchMapping("/bookings")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking updatedBooking) {
        List<Booking> existingBookings = Booking.removeBookingByBooking(updatedBooking, bookingRepository.findAll());
        bookingRepository.updateById(updatedBooking.getDate(), updatedBooking.getTime(), updatedBooking.getNumOfPeople(), updatedBooking.getTableNum(), updatedBooking.getDuration(), updatedBooking.getStatus(), updatedBooking.getId());
        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
    }


    @DeleteMapping("/bookings")
    public ResponseEntity<Void> deleteBooking(@RequestParam(name = "bookingId") Long id) {
        if (id != null) {
            bookingRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/bookings/return")
    public ResponseEntity<List<Booking>> deleteBookingsReturnRestBookingsOfSameCustomer(
            @RequestParam(name = "bookingId") Long bookingId,
            @RequestParam(name = "customerId") Long customerId) {
        if (bookingId != null) {
            bookingRepository.deleteById(bookingId);
            return new ResponseEntity<>(bookingRepository.findByCustomerId(customerId), HttpStatus.OK);
        }
        return new ResponseEntity<>(bookingRepository.findByCustomerId(customerId), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/bookings/customer")
    public ResponseEntity<List<Booking>> fetchByCustomerId(@RequestParam(name = "id") Long id) {
        return new ResponseEntity<>(bookingRepository.findByCustomerId(id), HttpStatus.OK);
    }

}
