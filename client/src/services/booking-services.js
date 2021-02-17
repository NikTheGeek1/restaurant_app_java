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