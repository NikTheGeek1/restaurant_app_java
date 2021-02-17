import { useState } from 'react';
import './BookingForm.css';
import FormInput from '../FormIpnut/FormInput';
import Button from '../Button/Button';
import { addBooking } from '../../services/booking-services';

const BookingForm = ({ tableNum, date, time, hideModalHandler }) => {
    const [numOfPeople, setNumOfPeople] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [formError, setFormError] = useState('')


    const onAddBookingHandler = e => {
        e.preventDefault();
        if (numOfPeople.trim() === '' || customerEmail.trim() === '') {
            setFormError('Fill in all fields');
            return;
        }
        if (numOfPeople > 8 || numOfPeople < 1) {
            setFormError('Number of people should be 1-8');
            return;
        }
        setFormError('');
        const booking = { numOfPeople, tableNum, date, time };
        addBooking(booking, customerEmail, 
            responseSuccess => hideModalHandler(false),
            responseError => setFormError(responseError.message));
    };

    return (
        <form className="booking-form-container" onSubmit={onAddBookingHandler}>
            <h3 className="booking-box-title">Booking reservation</h3>
            {formError !== '' && <h5 className="form-error-message">{formError}</h5>}
            <FormInput onChange={setCustomerEmail} placeholder="Email" label="Email" type="email" />
            <FormInput onChange={setNumOfPeople} placeholder="Number of people" label="Number of people" type="number" />
            <FormInput disabled={true} placeholder="Date" label="Date" type="date" value={date} />
            <FormInput disabled={true} placeholder="Time" label="Time" type="time" value={time}/>
            <FormInput disabled={true} placeholder="Table Number" label="Table Number" type="number" value={tableNum}/>
            <div className="form-btn-container">
                <Button title="Reserve" type="submit" />
            </div>
        </form>
    );
};

export default BookingForm;