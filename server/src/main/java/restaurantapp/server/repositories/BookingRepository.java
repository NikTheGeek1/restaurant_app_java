package restaurantapp.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import restaurantapp.server.models.booking.Booking;
import restaurantapp.server.models.booking.Status;

import java.awt.print.Book;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerEmail(String email);
    List<Booking> findByCustomerId(Long id);
    List<Booking> findByDate(LocalDate date);
    List<Booking> findByDateAndStatus(LocalDate date, Status status);


    @Modifying
    @Transactional
    @Query(value = "UPDATE bookings " +
            "SET date = :date, time = :time, num_of_people = :numPeople, table_num = :tableNum, status =:#{#status.ordinal()} " +
            "WHERE id = :id",
    nativeQuery = true)
    void updateById(@Param("date") LocalDate date, @Param("time") LocalTime time,
            @Param("numPeople") int numPeople, @Param("tableNum") int tableNum,
            @Param("status") Status status, @Param("id") Long id);
}
