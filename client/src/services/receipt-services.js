const URL = "http://restaurant-cc.herokuapp.com/receipts";

export const addReceipt = (receipt, cbSuccess, cbError) => {
    fetch(URL, {
        method: "POST",
        headers: {
            "Application": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(receipt)
    })
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200 && !response.id) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const fetchAllReceipts = (cbSuccess, cbError) => {
   fetch(URL)
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                if (cbError) {
                    cbError(response);
                } else {
                    console.log(response)
                }
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};