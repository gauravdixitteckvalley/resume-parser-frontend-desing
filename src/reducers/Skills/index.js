export function skills(state = [], action) {
    switch (action.type) {
        /* cases for listing of user starts */
        case 'SKILLS_LIST_REQUEST':
            return {
                blocking        : true,
                userList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
            }
        
        case 'SKILLS_LIST_SUCCESS':
            return {
                blocking        : false,
                skillsList      : action.payload.skills,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                currentPage     : action.payload.current_page,
            }
        
        case 'SKILLS_LIST_FAILURE':
            return {
                blocking        : false,
                skillsList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
            }
       
            /* cases for delete user starts */
        case 'DELETE_SKILLS_REQUEST':
            return {
                ...state,
                blocking        : true,
            };
        
        case 'DELETE_SKILLS_SUCCESS':
            return {
                ...state,
                blocking    : false,
                skillsList    : action.payload,
            };
        
        case 'DELETE_SKILLS_FAILURE':
            return {
                blocking : false
            };

        /* cases for edit form starts */
        case 'FETCH_SKILLS_EDIT_FORM_REQUEST':
            return {
                blocking : true,
                skills    : [],
            };
        
        case 'FETCH_SKILLS_EDIT_FORM_SUCCESS':
            return {
                blocking : false,
                skills     : action.payload.skills,
            };
        
        case 'FETCH_SKILLS_EDIT_FORM_FAILURE':
            return {
                blocking : false,
            };

        /* cases for submit form starts */
        case 'SUBMIT_SKILLS_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_SKILLS_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_SKILLS_FORM_FAILURE':
            return {
                blocking : false,
            };

        default:
            return state;
    }
}