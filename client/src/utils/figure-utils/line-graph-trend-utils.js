export const convertFetchedDataToPlotData = (bookingsData) => {
    const dailyBookingsCount = {};
    const status = [];
    bookingsData.forEach(booking => {
        const date = booking.date;
        status.push(booking.status);
        if (date in dailyBookingsCount) {
            dailyBookingsCount[date] += 1;
        } else {
            dailyBookingsCount[date] = 1;
        }
    })
    const [dates, counts] = convertObjectToArrays(dailyBookingsCount);
    const sortedObj = sortDates(dates);
    const sortedStatus = sortArrayByIndices(status, sortedObj.indices);
    const sortedCounts = sortArrayByIndices(counts, sortedObj.indices);
    return { dates: sortedObj.dates, counts: sortedCounts, status: sortedStatus };
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