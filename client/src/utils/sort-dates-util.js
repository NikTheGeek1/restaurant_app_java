
export const sortDates = (dates, order = 'asc') => {
    dates.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (order === 'asc') return dateA - dateB;
        if (order === 'desc') return dateB - dateA;
    });
    return dates;
};
