export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const ADMIN_LOGGED_IN = 'ADMIN_LOGGED_IN';

export const storeCookie = (cookie, id) => {
    localStorage.setItem(cookie, id);
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