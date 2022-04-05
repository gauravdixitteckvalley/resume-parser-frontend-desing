export function job(state = [], action) {
    console.log("action ",action, " state ",state)
    switch (action.type) {
        /* cases for submit form starts */
        case 'SUBMIT_JOB_POST_REQUEST':
           
            return {
                ...state,
                blocking : true
            };
        
        case 'SUBMIT_JOB_POST_SUCCESS':
            return {
                ...state,
                blocking : false
            };
        
        case 'SUBMIT_JOB_POST_FAILURE':
            return {
                blocking : false,
            };


        /* cases for listing of user starts */
        case 'POSTED_JOBS_LIST_REQUEST':
            return {
                ...state,
                blocking        : true,
                jobPostedList        : [],
                // totalRecords    : 0,
                // per_page        : 0,
                // currentPage     : 1,
            }
        
        case 'POSTED_JOBS_LIST_SUCCESS':
            return {
                ...state,
                blocking        : false,
                jobPostedList      : action.payload.data.postedJobList,
                // totalRecords    : action.payload.total,
                // per_page        : action.payload.per_page,
                // currentPage     : action.payload.current_page,
            }
        
        case 'POSTED_JOBS_LIST_FAILURE':
            return {
                ...state,
                blocking        : false,
                jobPostedList   : [],
                // totalRecords    : 0,
                // per_page        : 0,
                // currentPage     : 1,
            }
       
        case 'DELETE_POSTED_JOBS_LIST_REQUEST':
            return {
                ...state,
                blocking        : true,
            };
        
        case 'DELETE_POSTED_JOBS_LIST_SUCCESS':
            return {
                ...state,
                blocking    : false,
                jobPostedList    : action.payload,
            };
        
        case 'DELETE_POSTED_JOBS_LIST_FAILURE':
            return {
                blocking : false
            };

        default:
            return state;
    }
}