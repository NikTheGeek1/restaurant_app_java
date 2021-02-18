import './PortableModal.css';
import { isTableAvailable, getNearestBooking } from '../../utils/bookings-utils';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import BookingForm from '../BookingForm/BookingForm';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { useHistory } from 'react-router-dom';
import { removeBooking } from '../../services/booking-services';
import BookingReceipt from '../BookingReceipt/BookingReceipt';
import { addReceipt } from '../../services/receipt-services';

const PortableModal = ({ bookingDuration, clickedBooking, position, bookingData, tableNum, bookingTime, bookingDate, hidePortableModalHandler, dayBookings }) => {
    const [showAddBookingModal, setShowAddBookingModal] = useState(false);
    const [hidePortableModal, setHidePortableModal] = useState('');
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [showEditBookingModal, setShowEditBookingModal] = useState(false);
    const [nearestBookingDiff, setNearestBookingDiff] = useState(120);
    const [showCloseBookingModal, setShowCloseBookingModal] = useState(false);

    const history = useHistory();

    const addBookingHandler = () => {
        setHidePortableModal("hide-portable-modal");
        setShowAddBookingModal(true);
        const nearestBookingTime = getNearestBooking(dayBookings, tableNum, bookingTime);
        setNearestBookingDiff(nearestBookingTime);
    };

    const editBookingHandler = () => {
        setShowEditBookingModal(true);
        setHidePortableModal("hide-portable-modal");
    };

    const removeBookingHandler = () => {
        setHidePortableModal("hide-portable-modal");
        setDeleteConfirmationModal(true);
    };

    const deleteConfirmedHandler = () => {
        removeBooking(clickedBooking.id,
            successResponse => handleDeleteSuccesfulResponse(successResponse),
            errorResponse => console.log(errorResponse)
        );
    };

    const handleDeleteSuccesfulResponse = response => {
        hidePortableModalHandler({});
        history.push('/', { date: bookingDate, time: bookingTime, bookingDuration: bookingDuration });
    };

    const closeBookingHandler = () => {
        setShowCloseBookingModal(true);
        setHidePortableModal("hide-portable-modal");
    };

    const submitReceiptHandler = receipt => {
        setShowCloseBookingModal(false);
        addReceipt(receipt,
            successResponse => handleDeleteSuccesfulResponse(successResponse),
            errorResponse => console.log(errorResponse));
    };

    let modalOptionsJSX = (
        <div className="not-available-table portable-modal-inner">
            <div className="option-edit-booking portable-modal-option" onClick={editBookingHandler}>Edit</div>
            <div className="option-remove-booking portable-modal-option" onClick={removeBookingHandler}>Remove</div>
            <div className="option-get-booking-details portable-modal-option" onClick={closeBookingHandler}>Close</div>
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
        <div className={"portable-modal-container " + hidePortableModal} style={{ top: position.top, left: position.left }}>
            {modalOptionsJSX}
            <Modal hideModalHandler={setShowAddBookingModal} showModal={showAddBookingModal}>
                <BookingForm bookingDuration={bookingDuration} nearestBookingDiff={nearestBookingDiff} tableNum={tableNum} date={bookingDate} time={bookingTime} hidePortableModalHandler={hidePortableModalHandler} />
            </Modal>
            <Modal hideModalHandler={setDeleteConfirmationModal} showModal={deleteConfirmationModal}>
                <DeleteConfirmation title="Deleting booking - are you sure?" onDeleteConfirmed={deleteConfirmedHandler} hideModalHandler={setDeleteConfirmationModal} />
            </Modal>
            <Modal hideModalHandler={setShowEditBookingModal} showModal={showEditBookingModal}>
                <BookingForm bookingDuration={bookingDuration} clickedBooking={clickedBooking} tableNum={tableNum} date={bookingDate} time={bookingTime} hidePortableModalHandler={hidePortableModalHandler} />
            </Modal>
            <Modal hideModalHandler={setShowCloseBookingModal} showModal={showCloseBookingModal}>
                <BookingReceipt clickedBooking={clickedBooking} onSubmitReceipt={submitReceiptHandler} />
            </Modal>
        </div>
    );
};

export default PortableModal;