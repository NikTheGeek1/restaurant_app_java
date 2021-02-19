const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const convertFetchedDataToPlotData = (bookingsData) => {
    const datesBookingsCount = {};
    const timesBookingsCount = {};
    const daysBookingsCount = {};
    const status = [];
    bookingsData.forEach(booking => {
        const date = new Date(booking.date).getDate();
        const day = new Date(booking.date).getDay();
        const time = "2021-2-2 " + booking.time;
        status.push(booking.status);
        if (date in datesBookingsCount) {
            datesBookingsCount[date] += 1;
        } else {
            datesBookingsCount[date] = 1;
        }
        if (time in timesBookingsCount) {
            timesBookingsCount[time] += 1;
        } else {
            timesBookingsCount[time] = 1;
        }
        if (day in daysBookingsCount) {
            daysBookingsCount[day] += 1;
        } else {
            daysBookingsCount[day] = 1;
        }
    });

    const [dates, datesCounts] = convertObjectToArrays(datesBookingsCount);
    const [times, timesCounts] = convertObjectToArrays(timesBookingsCount);
    const [days, daysCounts] = convertObjectToArrays(daysBookingsCount);


    const sortedDatesObj = sortDates(dates);
    const sortedTimesObj = sortDates(times);
    const sortedDaysObj = sortDates(days);

    const datesSortedStatus = sortArrayByIndices(status, sortedDatesObj.indices);
    const timesSortedStatus = sortArrayByIndices(status, sortedTimesObj.indices);
    const daysSortedStatus = sortArrayByIndices(status, sortedDaysObj.indices);


    const sortedDatesCounts = sortArrayByIndices(datesCounts, sortedDatesObj.indices);
    const sortedTimesCounts = sortArrayByIndices(timesCounts, sortedTimesObj.indices);
    const sortedDaysCounts = sortArrayByIndices(daysCounts, sortedDaysObj.indices);

    return {
        dates: {
            dates: sortedDatesObj.dates,
            status: datesSortedStatus,
            counts: sortedDatesCounts
        },
        hours: {
            times: sortedTimesObj.dates,
            status: timesSortedStatus,
            counts: sortedTimesCounts
        },
        days: {
            days: DAYS,
            status: daysSortedStatus,
            counts: sortedDaysCounts
        }
    };
};

const sortArrayByIndices = (array, indices) => {
    const sortedArr = [];
    for (const i of indices) {
        sortedArr.push(array[i]);
    }
    return sortedArr;
};

const sortDates = dates => {
    const indices = [...Array(dates.length).keys()];
    indices.sort((a, b) => dates[a] < dates[b] ? -1 : dates[a] > dates[b] ? 1 : 0);
    dates.sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
    });
    return { dates, indices };
};



const convertObjectToArrays = object => {
    const arr1 = [];
    const arr2 = [];

    for (const key in object) {
        arr1.push(key);
        arr2.push(object[key]);
    }

    return [arr1, arr2];
};