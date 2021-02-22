import { LOG_USER_IN, LOG_USER_OUT } from '../actions/user-details';

const initialState = {
    isLoggedIn: false,
    userObj: {}
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_USER_IN:
            return { ...state, userObj: action.customer, isLoggedIn: true };

        case LOG_USER_OUT:
            return { ...state, userObj: {}, isLoggedIn: false };
        default:
            return state;
    }
}



export default reducer;