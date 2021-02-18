import { useState } from 'react';
import './BookingForm.css';
import FormInput from '../FormIpnut/FormInput';
import Button from '../Button/Button';
import { addBookingForCustomer, editBooking } from '../../services/booking-services';
import { useHistory } from 'react-router-dom';
import FormInputSlider from '../FormInputSlider/FormInputSlider';

const BookingForm = ({ type, clickedBooking, bookingDuration, tableNum, date, time, hidePortableModalHandler, nearestBookingDiff }) => {
    const [numOfPeople, setNumOfPeople] = useState(type === "edit" && clickedBooking.numOfPeople);
    const [customerEmail, setCustomerEmail] = useState('');
    const [formError, setFormError] = useState('')
    const [duration, setDuration] = useState(bookingDuration);
    const history = useHistory();

    const onAddBookingHandler = e => {
        e.preventDefault();

        setFormError('');
        const status = "PENDING";
        let booking = { numOfPeople, tableNum, duration, date, time, status };
        if (type === "edit") {
            booking = { ...booking, duration: clickedBooking.duration, id: clickedBooking.id };
            return editBooking(booking,
                responseSuccess => handleSuccesfulResponse(responseSuccess),
                responseError => console.log(responseError));
        }
        if (numOfPeople.trim() === '' || customerEmail.trim() === '') {
            setFormError('Fill in all fields');
            return;
        }
        if (numOfPeople > 8 || numOfPeople < 1) {
            setFormError('Number of people should be 1-8');
            return;
        }
        addBookingForCustomer(booking, customerEmail,
            responseSuccess => handleSuccesfulResponse(responseSuccess),
            responseError => console.log(responseError));
    };

    const handleSuccesfulResponse = response => {
        hidePortableModalHandler({});
        history.push('/', { date, time, bookingDuration });
    };

    return (
        <form className="booking-form-container" onSubmit={onAddBookingHandler}>
            <h3 className="booking-box-title">Booking reservation</h3>
            {formError !== '' && <h5 className="form-error-message">{formError}</h5>}
            <FormInput value={type === "edit" ? clickedBooking.customer.email : ''} disabled={type === "edit"} onChange={setCustomerEmail} placeholder="Email" label="Email" type="email" />
            <FormInput value={numOfPeople} onChange={setNumOfPeople} placeholder="Number of people" label="Number of people" type="number" />
            <FormInput disabled={true} placeholder="Date" label="Date" type="date" value={date} />
            <FormInputSlider title="Duration" onChange={setDuration} disabled={type === "edit"} sliderValue={type === "edit" ? clickedBooking.duration : duration} maxValue={nearestBookingDiff < 120 ? nearestBookingDiff : 120} />
            <FormInput disabled={true} placeholder="Time" label="Time" type="time" value={time} />
            <FormInput disabled={true} placeholder="Table Number" label="Table Number" type="number" value={tableNum} />
            <div className="form-btn-container">
                <Button title="Reserve" type="submit" />
            </div>
        </form>
    );
};

export default BookingForm;