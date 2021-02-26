const URL = "http://restaurant-cc.herokuapp.com/";

export const herokuWarmUpFetch = cb => {
    let t = setInterval(() => {

        fetch(URL) 
        .then(res => cb())
        .catch(err => {
            clearInterval(t);
            return herokuWarmUpFetch();
        });

    }, 1000)
};