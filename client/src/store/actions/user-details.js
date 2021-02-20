import { storeCookie, removeCookie, USER_LOGGED_IN } from '../../local-storage-utils/cookies-utils';
import { fetchCustomerById } from '../../services/customer-services';

export const LOG_USER_IN = "LOG_USER_IN";
export const LOG_USER_OUT = "LOG_USER_OUT";


export const logUserIn = customer => {
    if (!customer.email && customer !== undefined) {
        return dispatch => {
            fetchCustomerById(customer, fetchedCustomer => dispatch({ type: LOG_USER_IN, customer: fetchedCustomer }));
        };
    }
    storeCookie(USER_LOGGED_IN, customer.id);
    return { type: LOG_USER_IN, customer: customer };
};

export const logUserOut = () => {
    removeCookie(USER_LOGGED_IN);
    return { type: LOG_USER_OUT };
};