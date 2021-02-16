package restaurantapp.server.db;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import restaurantapp.server.models.booking.Booking;
import restaurantapp.server.models.receipt.MenuItem;
import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.models.Customer;
import restaurantapp.server.repositories.BookingRepository;
import restaurantapp.server.repositories.ReceiptRepository;
import restaurantapp.server.repositories.CustomerRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ReceiptRepository receiptRepository;

    public DataLoader() {}

    public void run(ApplicationArguments args) {
        Customer customer1 = new Customer("test1@test1.com", "123", "Nial");
        customerRepository.save(customer1);

        Booking booking1 = new Booking(LocalDate.of(2021, 2, 16), LocalTime.of(6, 0), 4, customer1, 4);
        bookingRepository.save(booking1);
        customer1.addBooking(booking1);

        Receipt receipt1 = new Receipt(booking1, Arrays.asList(MenuItem.SAMOSA, MenuItem.LEMON_SODA));
        booking1.setReceipt(receipt1);
        receiptRepository.save(receipt1);
    }

}
