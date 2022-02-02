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
    

        default:
            return state;
    }
}