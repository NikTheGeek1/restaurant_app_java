// export const getBookingsForTime = (timeSlotOffset, bookings) => {
//     const twoHours = 2 * 60 * 60 * 1000;
//     const timeSlotEnd = new Date(timeSlotOffset.setTime(timeSlotOffset.getTime() + twoHours));

//     return bookings.filter(booking => {
//         const bookingOffset = new Date(booking.date + " " + booking.time);
//         const bookingEnd = new Date(bookingOffset.setTime(bookingOffset.getTime() + twoHours));
//         if ((timeSlotOffset > bookingOffset &&
//             timeSlotOffset < bookingEnd)
//             || (timeSlotEnd > bookingOffset &&
//                 incomingBookingEnd < bookingEnd)
//             || (timeSlotOffset == bookingOffset)) {
//             return true;
//         }
//     });
// };

export const getBookingsOfSpecificHour = (timeSlotOffset, bookings) => {
    const twoHours = 2 * 60 * 60 * 1000;
    let timeSlotEnd = new Date(timeSlotOffset);
    timeSlotEnd.setTime(timeSlotOffset.getTime() + twoHours);
    timeSlotOffset = makeTimeComparable(timeSlotOffset);
    timeSlotEnd = makeTimeComparable(timeSlotEnd);
    return bookings.filter(booking => {
        let bookingOffset = new Date(booking.date + " " + booking.time);
        let bookingEnd = new Date(bookingOffset);
        bookingEnd.setTime(bookingOffset.getTime() + twoHours)
        bookingOffset = makeTimeComparable(bookingOffset);
        bookingEnd = makeTimeComparable(bookingEnd);
        if ((timeSlotOffset > bookingOffset &&
            timeSlotOffset < bookingEnd)
            || (timeSlotEnd > bookingOffset &&
                timeSlotEnd < bookingEnd)
            || (timeSlotOffset == bookingOffset)) {
            return true;
        }
    });
};

export const isTableAvailable = (bookings, tableNum) => {
    return !!!bookings.filter(booking => booking.tableNum === tableNum).length;
};

const addTreillingZero = (num) => {
    if (num < 10) {
        return "0"+num;
    }
    return num;
};

export const dateToString = date => {
    const monthWithZero = addTreillingZero(date.getMonth()+1);
    const dateWithZero = addTreillingZero(date.getDate());
    return date.getFullYear()+"-"+monthWithZero+"-"+dateWithZero;
};

const makeTimeComparable = time => {
    return time.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
};


// export const isTimeSlotAvailableAtTable = (timeSlotOffset, bookings) {};