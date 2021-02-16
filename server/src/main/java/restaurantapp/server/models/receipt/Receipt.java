package restaurantapp.server.models.receipt;

import restaurantapp.server.models.booking.Booking;

import java.util.List;

public class Receipt {

    private Booking booking;
    private List<MenuItem> order;
    private Double totalCost;


    public Receipt () {}

    public Receipt(Booking booking, List<MenuItem> order) {
        this.booking = booking;
        this.order = order;
        this.totalCost = calculateTotalCost();
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public List<MenuItem> getOrder() {
        return order;
    }

    public void setOrder(List<MenuItem> order) {
        this.order = order;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    private Double calculateTotalCost() {
        Double total = 0.0;
        for (MenuItem item : order) {
            total += item.getPrice();
        }
        return total;
    }
}
