package restaurantapp.server.models.booking;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import restaurantapp.server.models.receipt.Receipt;
import restaurantapp.server.models.Customer;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
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

    @Column
    private int duration;

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

    public Booking(LocalDate date, LocalTime time, Integer numOfPeople, Customer customer, Integer tableNum, int duration) {
        this.date = date;
        this.time = time;
        this.status = Status.PENDING;
        this.numOfPeople = numOfPeople;
        this.customer = customer;
        this.tableNum = tableNum;
        this.duration = duration;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
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

    private static boolean isTimeSlotAvailable(LocalTime incomingBookingOffset, Duration incomingBookingDuration, List<Booking> existingBookings) {
        for (Booking booking : existingBookings) {
            LocalTime existingBookingOffset = booking.getTime();
            LocalTime existingBookingEnd = booking.getTime().plus(Duration.ofMinutes(booking.getDuration()));
            LocalTime incomingBookingEnd = incomingBookingOffset.plus(incomingBookingDuration);
            if ((existingBookingEnd.isAfter(LocalTime.of(00, 00)) &&
                    existingBookingEnd.isBefore(LocalTime.of(10, 00))) ||
                    existingBookingEnd.equals(LocalTime.of(00, 00))) {
                existingBookingEnd = LocalTime.of(23, 30);
            }
            if ((incomingBookingOffset.isAfter(existingBookingOffset) &&
                    incomingBookingOffset.isBefore(existingBookingEnd))
                    ||   (incomingBookingEnd.isAfter(existingBookingOffset) &&
                    incomingBookingEnd.isBefore(existingBookingEnd))
                    || (incomingBookingOffset.isBefore(existingBookingOffset) &&
                    incomingBookingEnd.isAfter(existingBookingEnd))
                    ||   (incomingBookingOffset.equals(existingBookingOffset))){
                return false; // available = false
            }
        }
        return true; // available = true
    }

    public static boolean isBookingAvailable(Booking incomingBooking, List<Booking> existingBookings) {
        List<Booking> overlappingDayAndTableNumBookings = existingBookings.stream()
                .filter(booking -> booking.getStatus() == Status.PENDING && booking.getDate().isEqual(incomingBooking.getDate()) && booking.getTableNum() == incomingBooking.getTableNum())
                .collect(Collectors.toList());
        return isTimeSlotAvailable(incomingBooking.getTime(), Duration.ofMinutes(incomingBooking.getDuration()), overlappingDayAndTableNumBookings);
    }

    public static List<Booking> removeBookingByBooking(Booking bookingToBeRemoved, List<Booking> bookings) {
        return bookings.stream()
                .filter(booking -> booking.getId() != bookingToBeRemoved.getId())
                .collect(Collectors.toList());
    }

    public static List<Booking> removeBookingById(Long id, List<Booking> bookings) {
        return bookings.stream()
                .filter(booking -> booking.getId() != id)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public static List<LocalTime> getTimeSlots() {
        List<LocalTime> timeSlots = Arrays.asList(
                LocalTime.of(12, 00), LocalTime.of(12, 30),
                LocalTime.of(13, 00), LocalTime.of(13, 30),
                LocalTime.of(14, 00), LocalTime.of(14, 30),
                LocalTime.of(15, 00), LocalTime.of(15, 30),
                LocalTime.of(16, 00), LocalTime.of(16, 30),
                LocalTime.of(17, 00), LocalTime.of(17, 30),
                LocalTime.of(18, 00), LocalTime.of(18, 30),
                LocalTime.of(19, 00), LocalTime.of(19, 30),
                LocalTime.of(20, 00), LocalTime.of(20, 30),
                LocalTime.of(21, 00), LocalTime.of(21, 30),
                LocalTime.of(22, 00), LocalTime.of(22, 30));
        return timeSlots;
    }

    public static HashMap<LocalTime, List<Integer>> getAvailableTimeSlotsGivenDateAndDuration(
            List<Booking> existingBookings,
            LocalDate date,
            int duration)
    {
        List<Integer> tableNums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
        HashMap<LocalTime, List<Integer>> availableTimeSlots = new HashMap<>();
        for (LocalTime possibleTime : getTimeSlots()) {
            for (Integer possibleTableNum : tableNums) {
                Booking possibleBooking = new Booking(date, possibleTime, 4, new Customer(), possibleTableNum, duration);
                if (isBookingAvailable(possibleBooking, existingBookings)){
                        availableTimeSlots.computeIfAbsent(possibleTime, k -> new ArrayList<>()).add(possibleTableNum);
                }
            }
        }
        return availableTimeSlots;
    }
}
