import { useEffect, useState } from 'react';
import './CustomerHistory.css';
import { getBookingsForCustomer, removeBookingFetchRemaining } from '../../services/booking-services';
import { useSelector } from 'react-redux';
import CustomerPastBooking from '../CustomerPastBooking/CustomerPastBooking';
import Modal from '../Modal/Modal';
import CustomerPastReceipt from '../CustomerPastReceipt/CustomerPastReceipt';
import { useHistory } from 'react-router-dom';

const CustomerHistory = ({ dateWhichForceRerender }) => {
    const customerObj = useSelector(state => state.userDetails);
    const [customersHistory, setCustomersHistory] = useState([]);
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState({});
    const history = useHistory();

    useEffect(() => {
        getBookingsForCustomer(customerObj.userObj.id, succRes => setCustomersHistory(succRes));
    }, [dateWhichForceRerender]);

    const clickBookingHandler = booking => {
        if (booking.status === "PENDING") {
            removeBookingFetchRemaining(booking.id, customerObj.userObj.id, succRes => setCustomersHistory(succRes));
            history.push('/', { date: booking.date, time: booking.time, bookingDuration: booking.duration });
        } else {
            setSelectedBooking(booking);
            setShowBookingDetailsModal(true);
        }
    };
    const bookingsHistoryJSX = customersHistory.map(booking => {
        return <CustomerPastBooking key={booking.id} booking={booking} onClickBooking={clickBookingHandler} />;
    });

    return (
        <div className="customer-history-container">
            <Modal hideModalHandler={setShowBookingDetailsModal} showModal={showBookingDetailsModal}>
                <CustomerPastReceipt clickedBooking={selectedBooking} />
            </Modal>
            {bookingsHistoryJSX}
        </div>
    );
};

export default CustomerHistory;