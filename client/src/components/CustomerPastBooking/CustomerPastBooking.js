import './CustomerPastBooking.css';
import peopleNumIcon from '../../static/images/people-number.png'
import tableNumIcon from '../../static/images/table-number.png'
import durationIcon from '../../static/images/durations.png'

const CustomerPastBooking = ({ booking, onClickBooking }) => {
    const isDone = booking.status === "DONE";

    return (
        <div className="customer-past-booking">
            <div className={isDone ? "past-booking-title-done" : "past-booking-title"}>
                {booking.date}<br/> {booking.time.slice(0,5)}
            </div>
            <div className="past-booking-body">
                <img src={tableNumIcon} alt="table-icon" className="past-booking-table past-booking-icon"/>
                <div className="table-number"> {booking.tableNum}</div>
                <img src={peopleNumIcon} alt="people-icon" className="people-number-icon past-booking-icon"/>
                <div className="people-number">{booking.numOfPeople}</div>
                <img src={durationIcon} alt="duration-icon" className="duration-icon past-booking-icon"/>
                <div className="duration-number">{booking.duration}m</div>
                <div className={isDone ? "customer-remove-past-booking-done" : "customer-remove-past-booking"} onClick={() => onClickBooking(booking)}>
                    {isDone ? <h4>DETAILS</h4> : <h4>CANCEL</h4>}
                </div>
            </div>
        </div>
    );
};

export default CustomerPastBooking;