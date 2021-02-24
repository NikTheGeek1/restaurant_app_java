const URL = "http://restaurant-cc.herokuapp.com/admin";

export const loginAdmin = (name, password, cbSuccess, cbError) => {
    fetch(URL + `/login?name=${name}&password=${password}`, {
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