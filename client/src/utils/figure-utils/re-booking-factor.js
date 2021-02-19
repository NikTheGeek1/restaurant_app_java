

export const reRookingFactorCalculator = allBookings => {
    const allDates = allBookings.map(booking => booking.date);
    const allEmails = allBookings.map(booking => booking.customer.email);

    const { dates, indices } = sortDates(allDates);
    const emails = sortArrayByIndices(allEmails, indices);

    const data = {};
    for (let i = 0; i < dates.length; i++) {
        if (emails[i] in data) {
            const currentVisit = new Date(dates[i]);
            const diffTime = Math.abs(currentVisit - data[emails[i]].lastVisit);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            data[emails[i]].diffs.push(diffDays);
            data[emails[i]].lastVisit = currentVisit;
        } else {
            data[emails[i]] = { lastVisit: new Date(dates[i]), currentVisit: null, diffs: [] };
        }
    }

    let allDiffs = [];
    const allVisits = [];
    for (const key in data) {
        allDiffs.push(data[key].diffs);
        allVisits.push(data[key].diffs.length);
    }
    allDiffs = allDiffs.flat();
    const sumOfDiffs = allDiffs.reduce((acc, cur) => acc + cur);
    const totalVisits = allVisits.reduce((acc, cur) => acc + cur);

    return (sumOfDiffs / totalVisits).toFixed(2);

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

