package restaurantapp.server.models.receipt;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import restaurantapp.server.models.booking.Booking;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "receipts")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    @JsonIgnoreProperties(value = "receipt", allowSetters = true)
    private Booking booking;

    @ElementCollection
    @CollectionTable(
            name = "orders",
            joinColumns=@JoinColumn(name="receipt_id")
    )
    @Column(name = "order_items")
    private List<MenuItem> order;

    @Column(name = "total_cost")
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double calculateTotalCost() {
        Double total = 0.0;
        for (MenuItem item : order) {
            total += item.getPrice();
        }
        return total;
    }
}
