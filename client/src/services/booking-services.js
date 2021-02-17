import { fetchCustomer } from '../services/customer-services';

const URL = "http://localhost:8080/bookings";
export const getBookingsFromDate = (date, status, cbSuccess, cbError) => {
    fetch(URL + `?date=${date}&status=${status}`)
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

const makeReservation = (booking, customer, cbSuccess, cbError) => {
    const bookingWithCustomer = { ...booking, customer: customer };
    console.log(bookingWithCustomer, 'booking-services.js', 'line: ', '19');
    fetch(URL, {
        method: "POST",
        headers: {
            "Application": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingWithCustomer)
    })
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));

};

export const addBooking = (booking, customerEmail, cbSuccess, cbError) => {
    fetchCustomer(customerEmail,
        successResponse => makeReservation(booking, successResponse, cbSuccess, cbError),
        errorResponse => cbError(errorResponse));
};