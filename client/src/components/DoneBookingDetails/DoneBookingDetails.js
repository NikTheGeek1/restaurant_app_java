import './DoneBookingDetails.css';

const DoneBookingDetails = ({ clickedBooking }) => {
    console.log(clickedBooking, 'DoneBookingDetails.js', 'line: ', '4');

    const menuItemsJSX = clickedBooking.receipt.order.map((item, idx) => {
        return (
            <div className="db-details-menu-item" key={item+idx}>{item}</div>
        );
    });

    return (
        <div className="done-booking-details-container">
            <div className="db-details-date-container">
                <div className="db-details-date">{clickedBooking.date}</div>
                <div className="db-details-time">{clickedBooking.time}</div>
            </div>

            <div className="db-details-customer-container">
                <div className="db-details-name">{clickedBooking.customer.name}</div>
                <div className="db-details-email">{clickedBooking.customer.email}</div>
            </div>

            <div className="db-details-other-conteiner">
                <div className="db-details-duration">{clickedBooking.duration}</div>
                <div className="db-details-num-of-people">{clickedBooking.numOfPeople}</div>
                <div className="db-details-table-num">{clickedBooking.tableNum}</div>
            </div>

            <div className="db-details-menu-items-container">
                {menuItemsJSX}
            </div>
            <div className="db-details-menu-tota-cost">{clickedBooking.receipt.totalCost}</div>

        </div>
    );
};

export default DoneBookingDetails;