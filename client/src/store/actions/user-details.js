import { storeCookie, removeCookie, USER_LOGGED_IN } from '../../local-storage-utils/cookies-utils';

export const LOG_USER_IN = "LOG_USER_IN";
export const LOG_USER_OUT = "LOG_USER_OUT";


export const logUserIn = customer => {
    storeCookie(USER_LOGGED_IN, { isLoggedIn: true, userObj: customer });
    return { type: LOG_USER_IN, customer: customer };
};

export const logUserOut = () => {
    removeCookie(USER_LOGGED_IN);
    return { type: LOG_USER_OUT };
};