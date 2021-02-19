
export const convertFetchedDataToPlotData = receipts => {
    const itemCounter = {};
    receipts.forEach(receipt => {
        receipt.order.forEach(item => {
            if (item in itemCounter) {
                itemCounter[item] += 1;
            } else {
                itemCounter[item] = 1;
            }
        });
    });

    const [itemsArr, countsArr] = convertObjectToArrays(itemCounter);

    const { sortedCounts, indices } = sortReceiptsGetIndices(countsArr);
    const sortedItems = sortArrayByIndices(itemsArr, indices);
    return {items: sortedItems, counts: sortedCounts};

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

const sortReceiptsGetIndices = receipts => {
    const indices = [...Array(receipts.length).keys()];
    indices.sort((a, b) => receipts[a] < receipts[b] ? -1 : receipts[a] > receipts[b] ? 1 : 0);
    receipts.sort();
    const sortedCounts = receipts;
    return { sortedCounts, indices };
};


const sortArrayByIndices = (array, indices) => {
    const sortedArr = [];
    for (const i of indices) {
        sortedArr.push(array[i]);
    }
    return sortedArr;
};
