package restaurantapp.server.models.user;

import restaurantapp.server.models.booking.Booking;

import java.util.ArrayList;
import java.util.List;

public class Customer extends User{

    private List<Booking> bookings;

    public Customer() { }

    public Customer(String email, String password, String name) {
        super(email, password, name);
        this.bookings = new ArrayList<>();
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}
