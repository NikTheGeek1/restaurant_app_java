import { LOG_ADMIN_IN, LOG_ADMIN_OUT } from '../actions/admin-details';
const initialState = {
    isLoggedIn: false,
    adminObj: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_ADMIN_IN:
            return { ...state, adminObj: action.admin, isLoggedIn: true };

        case LOG_ADMIN_OUT:
            return { ...state, adminObj: {}, isLoggedIn: false };
        default:
            return state;
    }
}



export default reducer;