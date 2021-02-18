
const getAllBookingsOfTable = (tableNum, dayBookings) => {
    return dayBookings.filter(booking => booking.tableNum === tableNum);
};

const convertHoursToMins = hours => {
    return hours * 60;
};

const getTimesOfBookings = (bookings) => {
    return bookings.map(booking => convertHoursToMins(convertStringHourToIntHour(booking.time)));
};

const convertStringHourToIntHour = stringHour => {
    const hours = +stringHour.slice(0, 2);
    const mins = (+stringHour.slice(3, 5)) / 60;
    return hours + mins;
};


export const getNearestBooking = (dayBookings, tableNum, timeSlot) => {
    const tableBookings = getAllBookingsOfTable(tableNum, dayBookings);
    const timesInHours = getTimesOfBookings(tableBookings);
    const timeSlotInHours = convertHoursToMins(convertStringHourToIntHour(timeSlot));
    const bookingsAfterTimeSlot = timesInHours.filter(time => time > timeSlotInHours);
    return Math.min(...bookingsAfterTimeSlot) - timeSlotInHours;
};

export const getAvailableTablesOfSpecificHour = timeSlotBookings => {
    const availableTableNums = [1, 2, 3, 4, 5, 6, 7, 8].filter(table => !hasThisTableBookin(table, timeSlotBookings));
    return availableTableNums;  
};

const hasThisTableBookin = (tableNum, bookings) => {
    return !!bookings.filter(booking => booking.tableNum === tableNum).length;
};

const convertMinToMilSec = min => {
    return min * 60 * 1000; 
};

export const getBookingsOfSpecificHour = (timeSlotOffset, timeSlotDuration, dayBookings) => {
    const bookingDuration = convertMinToMilSec(timeSlotDuration);
    let timeSlotEnd = new Date(timeSlotOffset);
    timeSlotEnd.setTime(timeSlotOffset.getTime() + bookingDuration);
    timeSlotOffset = makeTimeComparable(timeSlotOffset);
    timeSlotEnd = makeTimeComparable(timeSlotEnd);
    return dayBookings.filter(booking => {
        let bookingOffset = new Date(booking.date + " " + booking.time);
        let bookingEnd = new Date(bookingOffset);
        bookingEnd.setTime(bookingOffset.getTime() + convertMinToMilSec(booking.duration));
        bookingOffset = makeTimeComparable(bookingOffset);
        bookingEnd = makeTimeComparable(bookingEnd);
        if ((timeSlotOffset > bookingOffset &&
            timeSlotOffset < bookingEnd)
            || (timeSlotEnd > bookingOffset &&
                timeSlotEnd < bookingEnd) 
            || (timeSlotOffset <= bookingOffset) &&
                (timeSlotEnd >= bookingEnd)
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