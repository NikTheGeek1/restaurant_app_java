export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const storeCookie = (cookie, cookieBody) => {
    localStorage.setItem(cookie, cookieBody);
};

export const removeCookie = cookie => {
    localStorage.removeItem(cookie);
};

export const isCookie = cookie => {
    return localStorage.getItem(cookie) !== null;
};

export const getCookie = cookie => {
    return localStorage.getItem(cookie);
}