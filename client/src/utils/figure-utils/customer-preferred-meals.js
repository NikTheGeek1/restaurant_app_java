

export const convertFetchedDataToPlotData = (customers, selectedCustomerEmail) => {
    if (!customers.length || !selectedCustomerEmail) {
        return {items: [], frequenies: [] ,};
    }
    const customerObje = customers.filter(customer => customer.email === selectedCustomerEmail)[0];
    const customersBookings = customerObje.bookings.filter(booking => booking.receipt);
    let allItems = customersBookings.map(booking => {
        return booking.receipt.order;
    });
    
    allItems = allItems.flat();
    const itemCounts = {};
    allItems.forEach(item => {
        if (item in itemCounts) {
            itemCounts[item] += 1;
        } else {
            itemCounts[item] = 1;
        }
    });
    const [items, counts] = convertObjectToArrays(itemCounts);

    return {items, counts};
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

