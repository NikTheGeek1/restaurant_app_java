const URL = "http://restaurant-cc.herokuapp.com/customers";

export const registerCustomer = (customer, cbSuccess, cbError) => {
    fetch(URL, {
        method: "POST",
        headers: {
            'Application': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const loginCustomer = (email, password, cbSuccess, cbError) => {
    fetch(URL + `/login?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
            'Application': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};


export const fetchCustomer = (customerEmail, cbSuccess, cbError) => {
    fetch(URL + `/make-reservation?email=${customerEmail}`, {
        method: 'POST',
        headers: {
            'Application': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(res => res.json())
        .then(response => {
            if (response.status && response.status !== 200) {
                cbError(response);
            } else {
                cbSuccess(response);
            }
        })
        .catch(err => console.log(err));
};

export const fetchAllCustomers = (cbSuccess, cbError) => {
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


export const fetchCustomerById = (id, cbSuccess, cbError) => {
    fetch(URL + `/id?id=${id}`)
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