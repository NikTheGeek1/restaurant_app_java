import './PortableModal.css';
import { isTableAvailable } from '../../utils/bookings-utils';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import BookingForm from '../BookingForm/BookingForm';

const PortableModal = ({ position, bookingData, tableNum, bookingTime, bookingDate }) => {
    const [showAddBookingModal, setShowAddBookingModal] = useState(false);

    const addBookingHandler = () => {
        setShowAddBookingModal("hide-portable-modal");
    };

    let modalOptionsJSX = (
        <div className="not-available-table portable-modal-inner">
            <div className="option-edit-booking portable-modal-option">Edit</div>
            <div className="option-remove-booking portable-modal-option">Remove</div>
            <div className="option-get-booking-details portable-modal-option">Details</div>
        </div>
    );

    if (isTableAvailable(bookingData, tableNum)) {
        modalOptionsJSX = (
            <div className={"available-table portable-modal-inner "}>
                <div className="add-booking-option portable-modal-option" onClick={addBookingHandler}>Add</div>
            </div>
        );
    }
    return (
        <div className={"portable-modal-container " + showAddBookingModal} style={{ top: position.top, left: position.left }}>
            {modalOptionsJSX}
            <Modal hideModalHandler={setShowAddBookingModal} showModal={showAddBookingModal}> 
                <BookingForm  tableNum={tableNum} date={bookingDate} time={bookingTime} hideModalHandler={setShowAddBookingModal}/>
            </Modal>
        </div>
    );
};

export default PortableModal;