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

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

        Booking booking1 = new Booking(LocalDate.of(2021, 2, 16), LocalTime.of(6, 0), 4, customer1, 4, 120);
        customer1.addBooking(booking1);

//        Receipt receipt1 = new Receipt(booking1, Arrays.asList(MenuItem.SAMOSA, MenuItem.LEMON_SODA));
//        booking1.setReceipt(receipt1);
        bookingRepository.save(booking1);
//        receiptRepository.save(receipt1);

        dataGenerator();

    }


    private void dataGenerator() {

        // DONE bookings
        for(int i = 0; i < 500; i++) {
            int randomNameAndEmailIdx = (int) (Math.random() * Constants.emails.size());
            String randomEmail = emailPicker(randomNameAndEmailIdx);
            String randomName = namePicker(randomNameAndEmailIdx);

            List<Customer> customerList = customerRepository.findByEmail(randomEmail);

            Customer customer = saveCustomerToDB(customerList, randomEmail, randomName);
            Booking booking = saveBookingToDB(customer,2);
        }
        // DONE continue since receipts must be given after all bookings have been created (no overlapping)
        List<Booking> bookings = bookingRepository.findAll();
        for (int i = 0; i < bookings.size(); i++) {
            Booking booking = bookings.get(i);
            saveReceiptToDB(booking);
        }
        // PENDING bookings
        for(int i = 0; i < 500; i++) {
            int randomNameAndEmailIdx = (int) (Math.random() * Constants.emails.size());
            String randomEmail = emailPicker(randomNameAndEmailIdx);
            String randomName = namePicker(randomNameAndEmailIdx);

            List<Customer> customerList = customerRepository.findByEmail(randomEmail);

            Customer customer = saveCustomerToDB(customerList, randomEmail, randomName);
            Booking booking = saveBookingToDB(customer, 3);
        }

    }

    private Receipt saveReceiptToDB(Booking booking) {
        List<MenuItem> randomMenuItems = generateRandomMenuItems();
        Receipt receipt = new Receipt(booking, randomMenuItems);
        booking.setReceipt(receipt);
        bookingRepository.updateById(booking.getDate(), booking.getTime(), booking.getNumOfPeople(), booking.getTableNum(), booking.getDuration(), booking.getStatus(), booking.getId());
        receiptRepository.save(receipt);
        return receipt;
    }

    private List<MenuItem> generateRandomMenuItems() {
        List<MenuItem> menuItems = new ArrayList<>();
        int menuItemsLength = MenuItem.values().length;
        int randomNumOfItems = (int) (Math.random() * menuItemsLength);
        for (int i = 0; i < randomNumOfItems; i++) {
            int randomIdx = (int) (Math.random() * menuItemsLength);
            menuItems.add(MenuItem.values()[randomIdx]);
        }
        return menuItems;
    }

    private Booking saveBookingToDB(Customer customer, int month) {
        LocalTime bookingTime = LocalTime.of(randomHour(), randomMinute());
        int randomTableNum = (int) (Math.random() * 8 + 1);
        LocalDate bookingDate = LocalDate.of(2021, month, randomDateOfMonth());
        List<Booking> existingBookings = bookingRepository.findByDate(bookingDate);
        int bookingDuration = randomDuration();
        Booking booking = new Booking(bookingDate, bookingTime, 4, customer, randomTableNum, bookingDuration);

        if (!Booking.isBookingAvailable(booking, existingBookings)) {
            return saveBookingToDB(customer, month);
        }
        customer.addBooking(booking);
        bookingRepository.save(booking);
        return booking;
    }

    private int randomDuration() {
        List<Integer> possibleDurations = Arrays.asList(30, 60, 90, 120);
        return possibleDurations.get((int) (Math.random() * possibleDurations.size()));

    }

    private int randomDateOfMonth() {
        return (int) (Math.random() * 28 + 1);
    }

    private int randomHour() {
        int min = 12;
        int max = 22;
        return min + (int) (Math.random() * ((max - min) + 1));
    }


    private int randomMinute() {
        List<Integer> availableMinutes = Arrays.asList(0, 30);
        return availableMinutes.get((int) (Math.random() * availableMinutes.size()));
    }
    private Customer saveCustomerToDB(List<Customer> customerList, String randomEmail, String randomName) {
        Customer customer;
        if (customerList.isEmpty()) {
            customer = new Customer(randomEmail, "123", randomName);
            customerRepository.save(customer);
        } else {
            customer = customerList.get(0);
        }
        return customer;
    }

    private String namePicker(int idx) {
        return Constants.names.get(idx);
    }

    private String emailPicker(int idx) {
        return Constants.emails.get(idx);
    }

}
