export function user(state = [], action) {
    switch (action.type) {
       
        /* cases for edit form starts */
        case 'FETCH_USER_EDIT_FORM_REQUEST':
            return {
                blocking    : true,
                users       : [],
                user_roles  : []
            };
        
        case 'FETCH_USER_EDIT_FORM_SUCCESS':
            return {
                blocking    : false,
                user        : action.payload.user,
                user_roles  : action.payload.user_roles
            };
        
        case 'FETCH_USER_EDIT_FORM_FAILURE':
            return {
                blocking : false,
            };

        default:
            return state;
    }
}