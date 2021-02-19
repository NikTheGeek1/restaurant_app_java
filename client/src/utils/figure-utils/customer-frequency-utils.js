
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
    bookings.sort();
    const sortedBookings = bookings;
    return { sortedBookings, indices };
};
