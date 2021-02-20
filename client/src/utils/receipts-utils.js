

export const countItems = order => {
    const itemCounter = {};
    order.forEach(item => {
        if (item in itemCounter) {
            itemCounter[item] += 1;
        } else {
            itemCounter[item] = 1;
        }
    });

    return itemCounter;
};