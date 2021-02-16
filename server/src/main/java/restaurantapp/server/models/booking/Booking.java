package restaurantapp.server.models.booking;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.models.Customer;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @Column
    private Status status;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"booking"})
    private Receipt receipt;

    @Column(name = "num_of_people")
    private Integer numOfPeople;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = true)
    @JsonIgnoreProperties({"bookings"})
    private Customer customer;

    @Column(name = "table_num")
    private Integer tableNum;

    public Booking() { }

    public Booking(LocalDate date, LocalTime time, Integer numOfPeople, Customer customer, Integer tableNum) {
        this.date = date;
        this.time = time;
        this.status = Status.PENDING;
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
        if (receipt != null) {
            this.status = Status.DONE;
        }
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

    public static List<Booking> removeBookingById(Booking bookingToBeRemoved, List<Booking> bookings) {
        return bookings.stream()
                .filter(booking -> booking.getId() != bookingToBeRemoved.getId())
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
