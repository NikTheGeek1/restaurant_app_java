export const sortTimes = times => {
    times.sort((a, b) => {
        const dateA = new Date(jsCoreDateCreator("2021-02-02 " + a));
        const dateB = new Date(jsCoreDateCreator("2021-02-02 " + b));
        return dateA - dateB;
    });
    return times;
};


export const sortDates = dates => {
    dates.sort((a, b) => {
        const dateA = new Date(jsCoreDateCreator(a));
        const dateB = new Date(jsCoreDateCreator(b));
        return dateA - dateB;
    });
    return dates;
};

const jsCoreDateCreator = (dateString) => { 
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
    let dateParam = dateString.split(/[\s-:]/)  
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()  
    return new Date(...dateParam)  
  }


