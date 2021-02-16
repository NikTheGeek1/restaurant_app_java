package restaurantapp.server.models.booking;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import restaurantapp.server.models.user.Customer;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class BookingTest {

    Booking booking1;
    Booking booking2;
    Customer customer1;
    Customer customer2;
    Customer customer3;
    List<Booking> bookings;


    @BeforeEach
    void setUp() {
        customer1 = new Customer("Joe1", "joe1@email.com", "123");
        customer2 = new Customer("Joe2", "joe2@email.com", "123");
        customer3 = new Customer("Joe3", "joe3@email.com", "123");
        booking1 = new Booking(LocalDate.of(2021, 2, 16), LocalTime.of(4, 0), 4, customer1, 4);
        booking2 = new Booking(LocalDate.of(2021, 2, 16), LocalTime.of(8, 0), 4, customer2, 4);
        bookings = Arrays.asList(booking1, booking2);
    }

    @Test
    void incomingBookingTimeOffsetOnDifferentDay_ExpectTrue() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(5, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 15), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetWayAwayBefore_ExpectTrue() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(1, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetWayAwayAfter_ExpectTrue() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(11, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetJustBefore_ExpectTrue() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(2, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetJustAfter_ExpectTrue() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(10, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetJustAfterBooking1_ExpectTrue() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(6, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

//    @Test
    void incomingBookingTimeOffsetOnPreExistingBookingOffset_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(4, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetBetweenPreexisistingBooking1_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(5, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetBetweenPreexisistingBooking2_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(9, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingEndBetweenPreexisistingBooking1_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(3, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingEndBetweenPreexisistingBooking2_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(7, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingonPreexisistingBooking1_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(4, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingonPreexisistingBooking2_ExpectFalse() {
        // booked time slots 4-6 and 8-10
        LocalTime incomingBookingOffset = LocalTime.of(8, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }
}