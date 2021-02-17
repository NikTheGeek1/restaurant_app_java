import { storeCookie, removeCookie, ADMIN_LOGGED_IN } from '../../local-storage-utils/cookies-utils';

export const LOG_ADMIN_IN = "LOG_ADMIN_IN";
export const LOG_ADMIN_OUT = "LOG_ADMIN_OUT";


export const logAdminIn = admin => {
    storeCookie(ADMIN_LOGGED_IN, { isLoggedIn: true, adminObj: admin });
    return { type: LOG_ADMIN_IN, customer: admin };
};

export const logAdminOut = () => {
    removeCookie(ADMIN_LOGGED_IN);
    return { type: LOG_ADMIN_OUT };
};