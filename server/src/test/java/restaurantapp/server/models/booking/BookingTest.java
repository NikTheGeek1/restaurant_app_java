package restaurantapp.server.models.booking;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import restaurantapp.server.models.Customer;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashMap;
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
        booking1 = new Booking(LocalDate.of(2021, 2, 16), LocalTime.of(14, 0), 4, customer1, 4, 120);
        booking2 = new Booking(LocalDate.of(2021, 2, 16), LocalTime.of(18, 0), 4, customer2, 4, 120);
        bookings = Arrays.asList(booking1, booking2);
    }

    @Test
    void incomingBookingTimeOffsetOnDifferentDay_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(15, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 15), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetWayAwayBefore_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(11, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetWayAwayAfter_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(23, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetJustBefore_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(12, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetJustAfter_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(20, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetJustAfterBooking1_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(16, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetBetweenPreexisistingBooking1_ExpectFalse() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(15, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingTimeOffsetBetweenPreexisistingBooking2_ExpectFalse() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(19, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingEndBetweenPreexisistingBooking1_ExpectFalse() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(13, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingEndBetweenPreexisistingBooking2_ExpectFalse() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(17, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingEndBeforePreexisistingBooking2SmallerDuration_ExpectTrue() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(17, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 60);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }

    @Test
    void incomingBookingonPreexisistingBooking1_ExpectFalse() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(14, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingonPreexisistingBooking2_ExpectFalse() {
        // booked time slots 14-16 and 18-20
        LocalTime incomingBookingOffset = LocalTime.of(18, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }

    @Test
    void incomingBookingEmptyPreexisingBookings_ExpectTrue() {
        LocalTime incomingBookingOffset = LocalTime.of(18, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 2, 16), incomingBookingOffset, 4, customer3, 4, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, Arrays.asList());
        assertTrue(isAvailable);
    }


    @Test
    void incomingBookingWrapsExistingBooking_ExpectFalse() {
        customer1 = new Customer("Joe1", "joe1@email.com", "123");
        customer2 = new Customer("Joe2", "joe2@email.com", "123");
        booking1 = new Booking(LocalDate.of(2021, 3, 5), LocalTime.of(18, 0 ), 4, customer1, 5, 30);
        bookings = Arrays.asList(booking1);
        LocalTime incomingBookingOffset = LocalTime.of(17, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 3, 5), incomingBookingOffset, 4, customer2, 5, 120);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }


    @Test
    void incomingBookingIsWrappedByExistingBooking_ExpectFalse() {
        customer1 = new Customer("Joe1", "joe1@email.com", "123");
        customer2 = new Customer("Joe2", "joe2@email.com", "123");
        booking1 = new Booking(LocalDate.of(2021, 3, 5), LocalTime.of(18, 0 ), 4, customer1, 5, 120);
        bookings = Arrays.asList(booking1);
        LocalTime incomingBookingOffset = LocalTime.of(19, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 3, 5), incomingBookingOffset, 4, customer2, 5, 30);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertFalse(isAvailable);
    }


    @Test
    void incomingBookingIsAfterExisting_ExpectTrue() {
        customer1 = new Customer("Joe1", "joe1@email.com", "123");
        booking1 = new Booking(LocalDate.of(2021, 3, 10), LocalTime.of(13, 30 ), 4, customer1, 3, 30);
        bookings = Arrays.asList(booking1);
        LocalTime incomingBookingOffset = LocalTime.of(14, 0);
        Booking incomingBooking = new Booking(LocalDate.of(2021, 3, 10), incomingBookingOffset, 4, customer2, 3, 90);
        boolean isAvailable = Booking.isBookingAvailable(incomingBooking, bookings);
        assertTrue(isAvailable);
    }




    @Test
    void shouldGetBackAllTimeSlotsAndAllTableNumsAsAvailable() {
        HashMap<LocalTime, List<Integer>> availableSlots = Booking.getAvailableTimeSlotsGivenDateAndDuration(Arrays.asList(), LocalDate.of(2021, 4, 4), 30);
        HashMap<LocalTime, List<Integer>> expectedOutcome = new HashMap<>();
        expectedOutcome.put(LocalTime.of(12, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(12, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(13, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(13, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(14, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(14, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(15, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(15, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(16, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(16, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(17, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(17, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(18, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(18, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(19, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(19, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(20, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(20, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(21, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(21, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(22, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(22, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        assertEquals(expectedOutcome, availableSlots);
    }

    @Test
    void shouldGetBackAllTimeSlotsAndAllTableNumsButTheExistingBookingTimeSlot_1() {
        customer1 = new Customer();
        booking1 = new Booking(LocalDate.of(2021, 4, 4), LocalTime.of(12, 00 ), 4, new Customer(), 1, 30);
        bookings = Arrays.asList(booking1);
        HashMap<LocalTime, List<Integer>> availableSlots = Booking.getAvailableTimeSlotsGivenDateAndDuration(bookings, LocalDate.of(2021, 4, 4), 30);
        HashMap<LocalTime, List<Integer>> expectedOutcome = new HashMap<>();
        expectedOutcome.put(LocalTime.of(12, 00), Arrays.asList(2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(12, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(13, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(13, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(14, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(14, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(15, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(15, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(16, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(16, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(17, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(17, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(18, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(18, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(19, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(19, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(20, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(20, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(21, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(21, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(22, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(22, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        assertEquals(expectedOutcome, availableSlots);
    }


    @Test
    void shouldGetBackAllTimeSlotsAndAllTableNumsButTheExistingBookingTimeSlot_2() {
        customer1 = new Customer();
        booking1 = new Booking(LocalDate.of(2021, 4, 4), LocalTime.of(12, 00 ), 4, new Customer(), 1, 120);
        bookings = Arrays.asList(booking1);
        HashMap<LocalTime, List<Integer>> availableSlots = Booking.getAvailableTimeSlotsGivenDateAndDuration(bookings, LocalDate.of(2021, 4, 4), 30);
        HashMap<LocalTime, List<Integer>> expectedOutcome = new HashMap<>();
        expectedOutcome.put(LocalTime.of(12, 00), Arrays.asList(2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(12, 30), Arrays.asList(2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(13, 00), Arrays.asList(2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(13, 30), Arrays.asList(2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(14, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(14, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(15, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(15, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(16, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(16, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(17, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(17, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(18, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(18, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(19, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(19, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(20, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(20, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(21, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(21, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        expectedOutcome.put(LocalTime.of(22, 00), Arrays.asList(1,2,3,4,5,6,7,8)); expectedOutcome.put(LocalTime.of(22, 30), Arrays.asList(1,2,3,4,5,6,7,8));
        assertEquals(expectedOutcome, availableSlots);
    }


}