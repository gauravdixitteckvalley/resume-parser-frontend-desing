import {getLoggedInUserData} from '../../utils/helper'; 

let user = getLoggedInUserData();
const initialState = user ? { user } : {};

export function authenticatedUser(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                user        : {},
                blocking    : true,
            };
        
        case 'LOGIN_SUCCESS':
            return {
                user        : action.payload,
                blocking    : false,
            };
        
        case 'LOGIN_FAILURE':
            return {
                user        : {},
                blocking    : false,
            };

        case 'RESET_LOGGED_USER_DATA':
            return [];
        
        default:
            return state
    }
}