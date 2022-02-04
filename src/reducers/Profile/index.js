export function profile(state = [], action) {
    switch (action.type) {
        
        /* cases for submit form starts */
        case 'SUBMIT_PROFILE_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_PROFILE_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_PROFILE_FORM_FAILURE':
            return {
                blocking : false,
            };
    

            /* cases change password for submit form starts */
        case 'SUBMIT_UPDATE_PASSWORD_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_UPDATE_PASSWORD_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_UPDATE_PASSWORD_FORM_FAILURE':
            return {
                blocking : false,
            };
        
        case 'CHANGE_LOGGED_USER_DATA':
            return [];

        default:
            return state;
    }
}