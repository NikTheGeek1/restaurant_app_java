export const sortTimes = times => {
    times.sort((a, b, order="asc") => {
        const dateA = new Date(jsCoreDateCreator("2021-02-02 " + a));
        const dateB = new Date(jsCoreDateCreator("2021-02-02 " + b));
        if (order === "asc") return dateA - dateB;
        if (order === "desc") return dateB - dateA;
    });
    return times;
};


export const sortDates = dates => {
    dates.sort((a, b, order="asc") => {
        const dateA = new Date(jsCoreDateCreator(a));
        const dateB = new Date(jsCoreDateCreator(b));
        if (order === "asc") return dateA - dateB;
        if (order === "desc") return dateB - dateA;
    });
    return dates;
};

export const sortBookingByDate = bookings => {
    bookings.sort((a, b, order="asc") => {
        const dateA = new Date(jsCoreDateCreator(a.date));
        const dateB = new Date(jsCoreDateCreator(b.date));
        if (order === "asc") return dateA - dateB;
        if (order === "desc") return dateB - dateA;
    });
    return bookings;
};

const jsCoreDateCreator = (dateString) => { 
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
    let dateParam = dateString.split(/[\s-:]/)  
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()  
    return new Date(...dateParam)  
  }


