import { fetchCustomerById } from '../../services/customer-services';

export const LOG_USER_IN = "LOG_USER_IN";
export const LOG_USER_OUT = "LOG_USER_OUT";


export const logUserIn = customer => {
    if (!customer.email && customer !== undefined) {
        return dispatch => {
            fetchCustomerById(customer, fetchedCustomer => dispatch({ type: LOG_USER_IN, customer: fetchedCustomer }));
        };
    }
    return { type: LOG_USER_IN, customer: customer };
};

export const logUserOut = () => {
    return { type: LOG_USER_OUT };
};