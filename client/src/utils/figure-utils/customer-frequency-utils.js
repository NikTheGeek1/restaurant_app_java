
export const convertFetchedDataToPlotData = customers => {
    const customersEmail = [];
    const numOfBookings = [];

    customers.forEach(customer => {
        if (customer.bookings) {
            customersEmail.push(customer.email);
            numOfBookings.push(customer.bookings.length)
        }
    });

    const { sortedBookings, indices } = sortBookingsGetIndices(numOfBookings);
    const sortedEmails = sortArrayByIndices(customersEmail, indices);
    console.log({ customers: sortedEmails, numOfBookings: sortedBookings }, 'customer-frequency-utils.js', 'line: ', '15');
    return { customers: sortedEmails, numOfBookings: sortedBookings };
};


const sortArrayByIndices = (array, indices) => {
    const sortedArr = [];
    for (const i of indices) {
        sortedArr.push(array[i]);
    }
    return sortedArr;
};

const sortBookingsGetIndices = bookings => {
    const indices = [...Array(bookings.length).keys()];
    indices.sort((a, b) => bookings[a] < bookings[b] ? -1 : bookings[a] > bookings[b] ? 1 : 0);
    bookings.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    const sortedBookings = bookings;
    return { sortedBookings, indices };
};
