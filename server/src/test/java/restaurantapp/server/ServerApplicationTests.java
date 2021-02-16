package restaurantapp.server;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import restaurantapp.server.models.Customer;
import restaurantapp.server.models.booking.Booking;
import restaurantapp.server.models.receipt.MenuItem;
import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.repositories.BookingRepository;
import restaurantapp.server.repositories.CustomerRepository;
import restaurantapp.server.repositories.ReceiptRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
class ServerApplicationTests {

	@Autowired
	BookingRepository bookingRepository;

	@Autowired
	ReceiptRepository receiptRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Test
	void canGetBookingsByCustomerEmail() {
		List<Booking> bookings = bookingRepository.findByCustomerEmail("test1@test1.com");
		assertEquals(1, bookings.size());
	}

	@Test
	void canGetCustomerByEmail() {
		Customer customer = customerRepository.findByEmail("test1@test1.com").get(0);
		assertEquals("test1@test1.com", customer.getEmail());
	}
}
