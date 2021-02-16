package restaurantapp.server.models.booking;

import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.models.user.Customer;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAmount;
import java.util.List;
import java.util.stream.Collectors;

public class Booking {

    private LocalDate date;
    private LocalTime time;
    private Status status;
    private Receipt receipt;
    private Integer numOfPeople;
    private Customer customer;
    private Integer tableNum;

    public Booking() { }

    public Booking(LocalDate date, LocalTime time, Integer numOfPeople, Customer customer, Integer tableNum) {
        this.date = date;
        this.time = time;
        this.status = Status.PENDING;
        this.receipt = null;
        this.numOfPeople = numOfPeople;
        this.customer = customer;
        this.tableNum = tableNum;
    }

    public Integer getTableNum() {
        return tableNum;
    }

    public void setTableNum(Integer tableNum) {
        this.tableNum = tableNum;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }

    public Integer getNumOfPeople() {
        return numOfPeople;
    }

    public void setNumOfPeople(Integer numOfPeople) {
        this.numOfPeople = numOfPeople;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    private static boolean isTimeSlotAvailable(LocalTime time, List<Booking> existingBookings) {
        Duration twoHours = Duration.ofHours(2);
        for (Booking booking : existingBookings) {
            LocalTime existingBookingOffset = booking.getTime();
            LocalTime existingBookingEnd = booking.getTime().plus(twoHours);
            LocalTime incomingBookingOffset = time;
            LocalTime incomingBookingEnd = time.plus(twoHours);
            if ((incomingBookingOffset.isAfter(existingBookingOffset) &&
                                    incomingBookingOffset.isBefore(existingBookingEnd))
               ||   (incomingBookingEnd.isAfter(existingBookingOffset) &&
                                    incomingBookingEnd.isBefore(existingBookingEnd))
               ||   (incomingBookingOffset.equals(existingBookingOffset))){
                return false; // available = false
            }
        }
        return true; // available = true
    }

    public static boolean isBookingAvailable(Booking incomingBooking, List<Booking> existingBookings) {
        Duration twoHours = Duration.ofHours(2);
        List<Booking> overlappingDayAndTableNumBookings = existingBookings.stream()
                .filter(booking -> booking.getStatus() == Status.PENDING && booking.getDate().isEqual(incomingBooking.getDate()) && booking.getTableNum() == incomingBooking.getTableNum())
                .collect(Collectors.toList());
        return isTimeSlotAvailable(incomingBooking.getTime(), overlappingDayAndTableNumBookings);
    }

}
