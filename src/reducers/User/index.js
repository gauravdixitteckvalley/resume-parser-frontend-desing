export function user(state = [], action) {
    switch (action.type) {
        /* cases for listing of user starts */
        case 'USER_LIST_REQUEST':
            return {
                blocking        : true,
                userList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
            }
        
        case 'USER_LIST_SUCCESS':
            return {
                blocking        : false,
                userList        : action.payload.user,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page,
            }
        
        case 'USER_LIST_FAILURE':
            return {
                blocking        : false,
                userList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
            }

        /* cases for delete user starts */
        case 'DELETE_USER_REQUEST':
            return {
                ...state,
                blocking        : true,
            };
        
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                blocking    : false,
                userList    : action.payload,
            };
        
        case 'DELETE_USER_FAILURE':
            return {
                blocking : false
            };
        
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

        /* cases for submit form starts */
        case 'SUBMIT_USER_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_USER_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_USER_FORM_FAILURE':
            return {
                blocking : false,
            };
        
        case 'FETCH_USER_ROLES_REQUEST':
            return {
                blocking : true,
                users       : [],
                user_roles  : []
            };
        
        case 'FETCH_USER_ROLES_SUCCESS':
            return {
                blocking : false,
                users       : [],
                user_roles  : action.payload.user_roles
            };

        case 'FETCH_USER_ROLES_FAILURE':
            return {
                blocking : false
            };

        case 'FETCH_USER_BY_ROLE_REQUEST':
            return {
                ...state,
                blocking : true,
                user_list  : []
            };
            
        case 'FETCH_USER_BY_ROLE_SUCCESS':
            return {
                ...state,
                blocking : false,
                user_list  : action.payload
            };
    
        case 'FETCH_USER_BY_ROLE_FAILURE':
            return {
                ...state,
                blocking : false,
                user_list:[]
            };    

        case 'RESET_USER_DATA':
            return [];

        default:
            return state;
    }
}