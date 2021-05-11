

export const calcLastMonthMoneyBookings = bookings => {
    const thisMonth = new Date().getMonth()-1;
    const thisYear = new Date().getYear();

    let totalIncome = 0;
    let bookingsNum = 0;
    bookings.forEach(booking => {
        if (booking.status === "DONE") {
            const currentVisitMonth = new Date(booking.date).getMonth() +1 ;
            const currentVisitYear = new Date(booking.date).getYear();
            if ((currentVisitMonth - thisMonth === 1) && currentVisitYear === thisYear ) {
                totalIncome += booking.receipt.totalCost;
                bookingsNum++;
            }
        }
    })
    return { totalIncome, bookingsNum };
};