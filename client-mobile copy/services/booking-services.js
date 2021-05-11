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

export const addBookingForCustomer = (booking, customerEmail, cbSuccess, cbError) => {
    fetch(URL + `/make-reservation?email=${customerEmail}`, {
        method: "POST",
        headers: {
            "Application": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    })
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200 && !response.id) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const removeBooking = (bookingId, cbSuccess, cbError) => {
    fetch(URL + `?bookingId=${bookingId}`, {
        method: "DELETE",
        headers: {
            "Application": 'application/json',
            "Content-Type": 'application/json'
        }
    })
        .then(response => {
            if (response.status && response.status !== 200 && !response.id) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const editBooking = (booking, cbSuccess, cbError) => {
    console.log(booking, 'booking-services.js', 'line: ', '54');
    fetch(URL, {
        method: "PATCH",
        headers: {
            "Application": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(booking)
    })
        .then(response => {
            if (response.status && response.status !== 200 && !response.id) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const getAllBookingsByStatus = (status, cbSuccess, cbError) => {
    fetch(URL + `?status=${status}`)
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                if (cbError) {
                    cbError(response);
                } else {
                    console.log(response)
                }
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const getAllBookings = (cbSuccess, cbError) => {
    fetch(URL)
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                if (cbError) {
                    cbError(response);
                } else {
                    console.log(response)
                }
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};


export const getBookingsForCustomer = (customerId, cbSuccess, cbError) => {
    fetch(URL + `/customer?id=${customerId}`)
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                if (cbError) {
                    cbError(response);
                } else {
                    console.log(response)
                }
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};


export const removeBookingFetchRemaining = (bookingId, customerId, cbSuccess, cbError) => {
    fetch(URL + `/return?bookingId=${bookingId}&customerId=${customerId}`, {
        method: "DELETE",
        headers: {
            "Application": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200 && !response.id) {
                if (cbError) {
                    cbError(response);
                } else {
                    console.log(response)
                }
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};