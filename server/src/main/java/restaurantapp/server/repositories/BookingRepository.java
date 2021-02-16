package restaurantapp.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import restaurantapp.server.models.booking.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerEmail(String email);
    List<Booking> findByCustomerId(Long id);
}
