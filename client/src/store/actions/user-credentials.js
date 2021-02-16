export const LOG_USER_IN = "LOG_USER_IN";
export const LOG_USER_OUT = "LOG_USER_OUT";


export const logUserIn = () => {
    return { type: LOG_USER_IN };
};

export const logUserOut = () => {
    return { type: LOG_USER_OUT };
};