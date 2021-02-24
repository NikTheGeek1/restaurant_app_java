const URL = "http://restaurant-cc.herokuapp.com/websck";

export const websckLogUserIn = (userName, userType, cbSuccess) => {
    fetch(URL+`/user-connect?userName=${userName}&userType=${userType}`, {
        method: "POST",
        headers: {
            "Application": "application/json",
            "Content-Type": "application/json"
        }})
        .then(response => {
            cbSuccess();
        })
        .catch(err => console.log(err))
};

export const getActiveUsersExceptMe = (myName, cbSuccess) => {
    fetch(URL + `/active-users-except/${myName}`)
        .then(res => res.json())
        .then(response => cbSuccess(response))
        .catch(err => console.log(err));
}

export const getAdmin = cbSuccess => {
    fetch(URL + '/get-admin')
        .then(res => res.json())
        .then(response => cbSuccess(response))
        .catch(err => console.log(err));
};

export const disconnectUser = (userName, cbSuccess) => {
    fetch(URL+`/user-disconnect?userName=${userName}`, {
        method: "POST",
        headers: {
            "Application": "application/json",
            "Content-Type": "application/json"
        }})
        .then(response => {
            cbSuccess();
        })
        .catch(err => console.log(err))
};
